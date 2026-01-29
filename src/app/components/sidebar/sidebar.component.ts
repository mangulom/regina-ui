import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/core-service/device.service';
import { NavItem } from '../../models/globals/nav-item';
import { Response } from '../../models/response';
import { RegSecPermissions } from '../../models/reg-sec-permissions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  codEmpresa: string = '0001';
  userId: number = -1;
  items: NavItem[] = [];

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');

   
      const user = JSON.parse(userString || '{}');
      this.userId = user.userId;
      this.authService.obtenerItemsMenu(this.userId, this.codEmpresa).subscribe(
        (response: any)=>{
          this.items = response;
          console.log("Items ", this.items);
        }

      )
    
    
  }

  /*   items: NavItem[] = [
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
          { label: 'Usuarios', icon: 'fa-solid fa-list', route: '/' },
          { label: 'Perfiles', icon: 'fa-regular fa-address-card', route: '/' },
          { label: 'Permisos', icon: 'fas fa-lock', route: '/' }
        ]
      },
      {
        label: 'Configuración',
        icon: 'fas fa-wrench',
        route: '/settings'
      }
    ]; */

  toggle(item: NavItem): void {
    // Navega si tiene ruta
    if (item.route) {
      this.router.navigate([item.route]);
    }

    // Expande / colapsa si tiene subitems
    if (item.subitems?.length) {
      this.items.forEach(i => {
        if (i === item) {
          i.expanded = !i.expanded;
        } else {
          i.expanded = false;
        }
      });
    }
  }

  navigate(sub: NavItem, event: MouseEvent): void {
    event.stopPropagation(); // evita que el click cierre el menú

    if (sub.route) {
      this.router.navigate([sub.route]);
    }
  }
}
