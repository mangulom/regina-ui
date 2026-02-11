import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(private http: HttpClient) { }

  token = sessionStorage.getItem('authToken');
  private apiUrlMaestros: string = environment.apiUrlMaestros;

  getListaAuxiliares(codEmpresa: string): Observable<Response> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Response>(`${this.apiUrlMaestros}mae-auxiliar/listar/${codEmpresa}`, {
      headers,
      responseType: 'json'
    });
  }
}
