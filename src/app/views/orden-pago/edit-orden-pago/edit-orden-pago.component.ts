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

export class DatosImagen {
  documentType?: string;
  documentNumber?: string;
  issuerRuc?: string;
  issuerAddress?: string;
  documentDate?: string;
  amount?: string;
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
    private loadingService: LoadingService
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

  ngOnInit(): void {
    const state = history.state;
    if (state && state.data) {
      this.orden = state.data;
    }
  }

  onBack(): void {
    this.location.back();
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
          this.dataImagen.documentType = response.detectedData.documentType;
          this.dataImagen.documentNumber = response.detectedData.documentNumber;
          this.dataImagen.issuerRuc = response.detectedData.issuerRuc;
          this.dataImagen.issuerAddress = response.detectedData.issuerAddress;
          this.dataImagen.documentDate = response.detectedData.documentDate;
          this.dataImagen.amount = response.detectedData.amount;
          this.dataImagen.currency = response.detectedData.currency;
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
}
