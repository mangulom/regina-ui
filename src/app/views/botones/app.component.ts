import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from '../../services/core-service/device.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {

  constructor(public deviceService: DeviceService) {}


  title = 'Rendición de Cuentas';

  items = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      subitems: [
        { label: 'Usuarios', icon: 'fas fa-user' },
        { label: 'Roles', icon: 'fas fa-user-shield' }
      ]
    },
    {
      label: 'Settings',
      icon: 'fas fa-cog',
      subitems: [
        { label: 'Perfil', icon: 'fas fa-id-badge' },
        { label: 'Seguridad', icon: 'fas fa-lock' }
      ]
    }
  ];

  ngOnInit(): void {

  }



}
