import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DefaultLayoutComponent } from './components/layout/default-layout/default-layout.component';
import { ListOrdenPagoComponent } from './views/orden-pago/list-orden-pago/list-orden-pago.component';
import { SettingsComponent } from './views/settings/settings.component';
import { EditOrdenPagoComponent } from './views/orden-pago/edit-orden-pago/edit-orden-pago.component';
import { ListSolicitudComponent } from './views/solicitud/list-solicitud/list-solicitud.component';
import { EditSolicitudComponent } from './views/solicitud/edit-solicitud/edit-solicitud.component';
import { ListUsuariosComponent } from './views/usuario/list-usuarios/list-usuarios.component';
import { EditUsuarioComponent } from './views/usuario/edit-usuario/edit-usuario.component';
import { ListPerfilesComponent } from './views/perfil/list-perfiles/list-perfiles.component';
import { EditPerfilComponent } from './views/perfil/edit-perfil/edit-perfil.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // Rutas con layout (primarias)
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'list-orders',
        component: ListOrdenPagoComponent
      },
      {
        path: 'edit-order',
        component: EditOrdenPagoComponent
      },
      {
        path: 'list-solicitudes',
        component: ListSolicitudComponent
      },
      {
        path: 'edit-solicitud',
        component: EditSolicitudComponent
      },
      {
        path: 'list-usuarios',
        component: ListUsuariosComponent
      },
      {
        path: 'edit-usuario',
        component: EditUsuarioComponent
      },
      {
        path: 'list-perfiles',
        component: ListPerfilesComponent
      },
      {
        path: 'edit-perfil',
        component: EditPerfilComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];
