import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavItem } from '../../../../models/globals/nav-item';

@Component({
  selector: 'app-default-footer-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-footer-mobile.component.html',
  styleUrls: ['./default-footer-mobile.component.scss']
})
export class DefaultFooterMobileComponent {

  constructor(private router: Router) {}

  items: NavItem[] = [
    {
      label: 'Procesos',
      icon: 'fas fa-cog',
      expanded: false,
      subitems: [
        { label: 'Órdenes de Pago', icon: 'fa-solid fa-list', route: '/list-orders' },
        { label: 'Solicitudes', icon: 'fas fa-user-shield', route: '' }
      ]
    },
    {
      label: 'Seguridad',
      icon: 'fas fa-shield',
      expanded: false,
      subitems: [
        { label: 'Usuarios', icon: 'fa-solid fa-list', route: '' },
        { label: 'Perfiles', icon: 'fa-regular fa-address-card', route: '' },
        { label: 'Permisos', icon: 'fas fa-lock', route: '' }
      ]
    },
    {
      label: 'Configuración',
      icon: 'fas fa-wrench',
      route: '/settings'
    }
  ];

  openIndex: number | null = null;

  toggleDropdown(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

handleClick(route?: string) {
  // Siempre cierra el dropdown al hacer clic en un subitem
  this.openIndex = null;

  if (route) {
    console.log('Navegando a:', route);
    this.router.navigate([route]);
  }
}
}
