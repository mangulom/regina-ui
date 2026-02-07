import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapperRequestIA } from '../models/wrappers/wrapper-request-ia';

// Interfaz para tipar la respuesta del servicio FastAPI
export interface ChatResponse {
  tipo: string;
  respuesta: any;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ReginaIaService {

  private baseUrl = 'http://localhost:6700'; // Cambiar por tu IP o localhost

  constructor(private http: HttpClient) { }

  enviarPregunta(payload: WrapperRequestIA
  ): Observable<ChatResponse> {
    try {
    return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, payload);
  } catch (error) {
    console.error('Error al enviar la pregunta:', error);
    throw error;
  } 
}
}
