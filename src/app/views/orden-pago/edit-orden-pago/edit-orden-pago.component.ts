import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

import Tesseract from 'tesseract.js';

import { OrdenPago } from '../../../models/orden-pago';
import { OcrService } from '../../../services/ocr.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LoadingDancingSquaresComponent } from '../../../components/loading-dancing-squares/loading-dancing-squares.component';
import { LoadingService } from '../../../services/loading.service';
import { Observable } from 'rxjs';
import { SunatService } from '../../../services/sunat-service';
import { Response } from '../../../models/response';
import { Router } from '@angular/router';
import { PadronRuc } from '../../../models/padron-ruc';


export class ItemDetalle {
  descripcion?: string;
  // agrega aquí otras propiedades si las tienes
}

export class DatosImagen {
  documentType?: string;
  documentNumber?: string;
  documentCurrency?: string;
  issuerRuc: string[] = [];
  issuerName?: string;
  issuerAddress?: string;
  documentDate?: string;
  amount?: string;
  items: ItemDetalle[] = [];
  currency?: string;
}
@Component({
  selector: 'app-edit-orden-pago',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperComponent,
    LoadingDancingSquaresComponent,
    NgxCurrencyDirective
  ],
  templateUrl: './edit-orden-pago.component.html',
  styleUrls: ['./edit-orden-pago.component.scss']
})
export class EditOrdenPagoComponent implements OnInit {

  constructor(
    private location: Location,
    private ocrService: OcrService,
    private loadingService: LoadingService,
    private sunatService: SunatService,
    private router: Router,
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  orden: OrdenPago = new OrdenPago();
  dataImagen: DatosImagen = new DatosImagen();
  imageChangedEvent: Event | null = null;
  previewImage: string | null = null;
  croppedImage: string | null = null;
  showImageCropper = true;
  recognizedText = '';
  isLoading$: Observable<boolean>;
  detalle: string = '';
  ruc: string = "";
  validate: boolean = false;
  mensaje: string = "";
  padronRuc: PadronRuc = new PadronRuc();

  ngOnInit(): void {
    const state = history.state;
    if (state && state.data) {
      this.orden = state.data;
    }
  }

  onBack(): void {
    this.location.back();
  }

  onGetDatosRuc() {
    this.sunatService.getDataRUC(this.ruc).subscribe(
      (response: Response) => {
        if (response.error == 0) {
          this.padronRuc = response.resultado;
          console.log("Pdrón RUC ",this.padronRuc);
          this.mensaje = "";
          if (this.padronRuc.estado!=='ACTIVO') {
            this.mensaje+='EL CONRIBUYENTE NO EN ENCUENTRA ACTIVO '
            this.validate = false;
          }
          if (this.padronRuc.condicion!=='HABIDO') {
            this.mensaje+='EL CONRIBUYENTE NO EN ENCUENTRA HABIDO '
            this.validate = false;
          }
          this.dataImagen.issuerName = response.resultado.razonSocial;
          const direccion =
            (response.resultado.tipoVia ? response.resultado.tipoVia + ' ' + response.resultado.nombreVia : '') + ' ' +
            (response.resultado.codZona ? response.resultado.codZona + ' ' + response.resultado.tipoZona : '') + ' ' +
            (response.resultado.numero ? ' NRO.' + response.resultado.numero : '') +
            (response.resultado.interior ? ' INT. ' + response.resultado.interior : '') +
            (response.resultado.manzana && response.resultado.manzana != '-' ? ' MZA. ' + response.resultado.manzana : '') +
            (response.resultado.lote && response.resultado.lote != '-' ? ' LTE. ' + response.resultado.manzana : '');
          this.dataImagen.issuerAddress = direccion.trim();
        }
      },
      (error) => {
        console.log("No se pudieron obtener los datos del Contribuyente");
      }
    )
  }

  // ===============================
  // Selección de imagen
  // ===============================
  onSelectImage(event: Event): void {
    this.loadingService.show();
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.imageChangedEvent = event;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.ocrService.uploadImage(file).subscribe({
      next: (response: any) => {
        if (response?.detectedData) {
          console.log("Deteted ", response.detectedData)
          this.dataImagen.documentType = response.detectedData.documentType;
          this.dataImagen.documentNumber = response.detectedData.documentNumber;
          this.dataImagen.issuerName = response.detectedData.issuerName;
          this.dataImagen.issuerRuc = response.detectedData.issuerRuc;
          if (this.dataImagen.issuerRuc) {
            this.ruc = this.dataImagen.issuerRuc[0];
          }
          this.dataImagen.issuerAddress = response.detectedData.issuerAddress;
          this.dataImagen.documentDate = response.detectedData.documentDate;
          this.dataImagen.amount = response.detectedData.amount;
          this.dataImagen.documentCurrency = response.detectedData.documentCurrency;
          this.dataImagen.items = response.detectedData.items;
          this.detalle = "";
          for (let e = 0; e < this.dataImagen.items.length; e++) {
            this.detalle += this.dataImagen.items[e].descripcion + '\n';
          }
          this.onGetDatosRuc();
          this.loadingService.hide();
        }
      },
      error: err => {
        console.error(err);
        this.loadingService.hide();
      }
    });
  }

  // ===============================
  // Recorte
  // ===============================
  onImageCropped(event: ImageCroppedEvent): void {
    if (event.base64) {
      this.croppedImage = event.base64;
      return;
    }
    if (event.blob) {
      const reader = new FileReader();
      reader.onload = () => {
        this.croppedImage = reader.result as string;
      };
      reader.readAsDataURL(event.blob);
    }
  }

  toggleImageCropper(): void {
    this.showImageCropper = !this.showImageCropper;
  }

  // ===============================
  // OCR sobre el recorte
  // ===============================
  async runOcr(): Promise<void> {
    try {
      const result = await Tesseract.recognize(
        this.croppedImage ?? '',
        'spa',
        {
          logger: m => console.log(m)
        }
      );
      this.recognizedText = result.data.text;
      await this.copyToClipboard(this.recognizedText);
    } catch (err) {
      console.error('Error OCR:', err);
    }
  }

  async copyToClipboard(text: string): Promise<void> {
    if (!text || !text.trim()) {
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  onClose() {
    this.orden = new OrdenPago();
    this.dataImagen = new DatosImagen();
    this.imageChangedEvent = null;
    this.previewImage = null;
    this.croppedImage = null;
    this.showImageCropper = true;
    this.recognizedText = '';
    this.detalle = '';
    this.ruc = "";
    this.router.navigate(['/list-orders']);
  }

  ruccompleto() {
    if (this.ruc.length == 11) {
      this.onGetDatosRuc();
    } else {
      this.mensaje = "";
      this.validate = false;
    }
  }
}
