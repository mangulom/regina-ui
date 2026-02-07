import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrdenPago } from '../../../models/orden-pago';
import { OrdenPagoService } from '../../../services/orden-pago.service';
import { WrapperRequestOrdenPago } from '../../../models/wrappers/wrapper-request-orden-pago';
import { Response } from '../../../models/response';
import { OcrService } from '../../../services/ocr.service';


export class Imagen {
  // Propiedades de la clase
  documentType?: string;
  documentNumber?: string;
  issuerRuc?: string;
  issuerAddress?: string;
  documentDate?: string;
}

@Component({
  selector: 'app-list-orden-pago',
  templateUrl: './list-orden-pago.component.html',
  styleUrls: ['./list-orden-pago.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListOrdenPagoComponent implements OnInit, OnDestroy {

  @ViewChild('myTable') tableRef!: ElementRef;
  @ViewChild('orderDialog') orderDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  
  constructor(
    private ordenPagoService: OrdenPagoService,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private ocrService: OcrService) { }

  ordenes: OrdenPago[] = [];
  wrapperRequestOrdenPago: WrapperRequestOrdenPago = new WrapperRequestOrdenPago();
  isAdminUser = '';

  totalItems = 0;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  @ViewChild('orderModal')
  orderModal!: TemplateRef<any>;

  private navigationSub!: Subscription;

  imagen: Imagen = new Imagen();

  ngOnInit(): void {
    this.inicializarWrapperDesdeSession();
    this.cargarDesdeStateOApi();

    this.navigationSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarDesdeStateOApi();
      });
  }

  ngOnDestroy(): void {
    this.navigationSub?.unsubscribe();
  }

  private inicializarWrapperDesdeSession(): void {

    const userString = sessionStorage.getItem('user');

    if (!userString) {
      return;
    }

    try {

      const user = JSON.parse(userString);
      this.isAdminUser = user.profileType || '';
      this.wrapperRequestOrdenPago.codAuxiliar = user.codAuxiliar || '';
      this.wrapperRequestOrdenPago.codEmpresa = user.codEmpresa || '';
      this.wrapperRequestOrdenPago.codSucursal = user.codSucursal || '';

    } catch (e) {
      console.error('Error al parsear User desde sessionStorage', e);
    }
  }

  private cargarDesdeStateOApi(): void {

    const state = history.state;

    if (state && state.data && state.data.resultado) {

      this.ordenes = state.data.resultado;
      this.calculateTotalPages();

    } else {

      this.getOrdenesPago();
      this.calculateTotalPages();

    }
  }

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  getOrdenesPago(): void {

    this.ordenPagoService
      .getOrdenesPago(this.wrapperRequestOrdenPago)
      .subscribe((response: Response) => {

        this.ordenes = response.resultado || [];
        this.totalItems = this.ordenes.length;   // ← faltaba
        this.calculateTotalPages();

      });
  }

  onBack(): void {
    this.location.back();
  }

  openModal() {
    this.dialogRef = this.dialog.open(this.orderDialog, {
      width: '90%',
      height: '90%',
      maxWidth: '90%',
      maxHeight: '90%',
      panelClass: 'custom-dialog-container',  // Clase para estilos adicionales
      autoFocus: false
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSelectImage(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const formData = new FormData();
    formData.append('file', file);
    this.ocrService.uploadImage(file).subscribe(
      (response: any) => {
        console.log('Respuesta del OCR:', response);
        this.imagen.documentType = response.detectedData.documentType;
        this.imagen.documentNumber = response.detectedData.documentNumber;
        this.imagen.issuerRuc = response.detectedData.issuerRuc;
        this.imagen.issuerAddress = response.detectedData.issuerAddress;
        this.imagen.documentDate = response.detectedData.documentDate;
      }
    )
  }

  openEditOrdenPago(orden: OrdenPago) {
    console.log("Orden de Pago a editar:", orden);
    this.router.navigate(['/edit-order'], { state: { data: orden } });
  } 
}
