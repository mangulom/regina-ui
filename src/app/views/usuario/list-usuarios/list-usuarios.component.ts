import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegSecUser } from '../../../models/reg-sec-user';
import { RegSecUserService } from '../../../services/reg-sec-user.service';
import { WrapperRequestUsuario } from '../../../models/wrappers/wrapper-request-usuario';
import { Response } from '../../../models/response';

@Component({
  selector: 'app-list-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-usuarios.component.html',
  styleUrl: './list-usuarios.component.scss'
})
export class ListUsuariosComponent {
constructor(private regSecUserService: RegSecUserService, private location: Location) { }

  @ViewChild('myTable', { static: true }) tableRef!: ElementRef;

  usuarios: RegSecUser[] = [];
  wrapperRequestUsuario: WrapperRequestUsuario = new WrapperRequestUsuario();

  // Columnas de la tabla
  columns = [
    { key: 'userName', label: 'Nombre de Usuario', color: 'PRIMARY' },
    { key: 'userLastName', label: 'Apellido', color: 'SUCCESS' },
    { key: 'userMiddleName', label: 'Segundo Nombre', color: 'DANGER' },
    { key: 'userStatus', label: 'Estado', color: 'DANGER' },
    { key: 'profileShortName', label: 'Perfil', color: 'DANGER' },
    { key: 'profileType', label: 'Tipo de Perfil', color: 'DANGER' },
  ];

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');
    const state = history.state;
    console.log("State ",state);

    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.wrapperRequestUsuario.codEmpresa = user.codEmpresa || '';
        this.wrapperRequestUsuario.codSucursal = user.codSucursal || '';
        if (state.data) {
          this.usuarios = state.data.resultado;
        } else {
          this.getUsuarios();
        }
      } catch (e) {
        console.error('Error al parsear User desde sessionStorage', e);
      }
    }
  }

  getUsuarios() {
    this.regSecUserService.getRegSecUsers(this.wrapperRequestUsuario).subscribe(
      (response: Response) => {
        this.usuarios = response.resultado || [];
      }
    );
  }

  onBack() {
    this.location.back();
  }
}
