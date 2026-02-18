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
import { RegRenValidateService } from '../../../services/reg-ren-validate.service';
import { RegRenValidate } from '../../../models/reg-ren-validate';
import { OrdenPagoDet } from '../../../models/orden-pago-det';
import { OrdenPagoDetService } from '../../../services/orden-pago-det.service';
import { WrapperRequestOrdenPagoDet } from '../../../models/wrappers/wrapper-request-orden-pago-det';

@Component({
  selector: 'app-edit-orden-pago',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingDancingSquaresComponent
  ],
  templateUrl: './list-orden-paso-det.component.html',
  styleUrls: ['./list-orden-paso-det.component.scss']
})
export class ListOrdenPagoDetComponent implements OnInit {

  constructor(
    private location: Location,
    private ordenPagoDetService: OrdenPagoDetService,
    private loadingService: LoadingService,

  ) {
    this.isLoading$ = this.loadingService.loading$;
  }
  isLoading$: Observable<boolean>;
  filtrarDetalle: string = "";
  orden: OrdenPago = new OrdenPago();
  pageSize = 6;
  currentPage = 0;
  totalItems = 0;
  totalPages = 0;

  detalles: OrdenPagoDet[] = [];
  ordenesGeneral: OrdenPagoDet[] = [];
  pagedDetalles: OrdenPagoDet[] = [];

  ngOnInit(): void {
    const state = history.state;
    if (state && state.data) {
      this.orden = state.data;
      this.getOrdenPagoDet();
    }
  }

  onBack(): void {
    this.location.back();
  }

  filtrar() {

  }

  private buildPagination(): void {

    this.totalItems = this.detalles.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;

    this.pagedDetalles = this.detalles.slice(start, end);
  }

  changePage(page: number): void {

    if (page < 0 || page >= this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.buildPagination();
  }

  getOrdenPagoDet() {
    this.loadingService.show();
    var wrapper: WrapperRequestOrdenPagoDet = new WrapperRequestOrdenPagoDet();
    wrapper.codEmpresa = this.orden.codEmpresa;
    wrapper.codSucursal = this.orden.codSucursal;
    wrapper.numOrden = this.orden.numOrden;
    this.ordenPagoDetService.getOrdenesPagoDet(wrapper).subscribe(
      (response: Response) => {
        console.log(response);
        this.detalles = response.resultado;
        this.detalles = response.resultado;
        this.currentPage = 0;
        this.buildPagination();
        this.loadingService.hide();
      },
      (error)=>{
        this.loadingService.hide();
      }
    )
  }


}
