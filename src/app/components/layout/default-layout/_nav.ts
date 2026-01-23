import { ICustomNavData } from '../../models/ICustomNavData';

export const navItems: ICustomNavData[] = [
  {
    name: 'Inicio',
    url: '/home',
    class: 'item',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    class: 'item',
    iconComponent: { name: 'cil-speedometer' },
    //roles: ['ADMINDASHBOARD'],
    color: '#929292'
  },
  {
    name: 'Maestros',
    url: '/maestro',
    class: 'item',
    icon: 'cib-buffer',
    children: [
      {
        name: 'General',
        url: '/maestro/generales',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['SHOWMAESTROSGENERAL']
      },
      {
        name: 'Clientes y Ubicación',
        url: '/maestro/clientes-ubicacion',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['SHOWMAESTROSCLIENTESUBICACION']
      },
      {
        name: 'Obras',
        url: '/maestro/obras',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['SHOWMOBRAS']
      },
      {
        name: 'Arrendamiento de Inmuebles',
        url: '/maestro/arrendamientos',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['SHOWARRENDAMIENTOS']
      },
      {
        name: 'Facturación',
        url: '/maestro/facturacion',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['SHOWFACTURACION']
      },
      {
        name: 'Cobranzas y Aplicaciones',
        url: '/maestro/cobranzas-aplicaciones',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['SHOWCOBRANZASAPLICACIONES']
      },
    ]
  },
  {
    name: 'Obras',
    iconComponent: { name: 'cil-settings' },
    class: 'item',
    url: '/process',
    roles: ['SHOWOBRAS'],
    children: [
      {
        name: 'Licitaciones',
        url: '/process/obras/licitaciones',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['ADMINLICITACIONES'],
      },
      {
        name: 'Contratos de Obras',
        url: '/process/obras/contratos',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['ADMINCONTRATOS'],
      },
      {
        name: 'Valorizaciones',
        url: '/process/valorizaciones',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['ADMINVALORIZACIONES'],
      },
      {
        name: 'Adelantos',
        url: '/componentes-adelantos',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['ADMINADELANTOS'],
      },
    ]
  },
  {
    name: 'Arrendamientos',
    icon: 'cil-building',
    class: 'item',
    url: '/process/arrendamientos',
    roles: ['SHOWARRENDAMIENTOS'],
    children: [
      {
        name: 'Contratos de Arrendamiento',
        url: '/process/arrendamientos/contratos',
        icon: 'nav-icon-bullet',
        class: "child-item",
        roles: ['ADMINARRENDAMIENTO']
      }
    ]
  },
  {
    name: 'Facturacion',
    url: '/facturacion',
    icon: 'cil-money',
    class: 'item'
  },
  {
    name: 'Cobranzas',
    url: '/collections',
    class: 'item',
    icon: 'cil-barcode',
    children: [
      {
        name: 'Cobranzas',
        url: '/collections/collections',
        icon: 'nav-icon-bullet',
        class: "child-item"
      },
      {
        name: 'Aplicaciones',
        url: '/collections/credit-note',
        icon: 'nav-icon-bullet',
        class: "child-item"
      },
    ]
  },
  {
    name: 'Transf. y Cierre',
    url: '/transfer',
    class: 'item',
    icon: 'cil-balance-scale',
    children: [
      {
        name: 'Transferencias',
        url: '/transfer/oracle',
        icon: 'nav-icon-bullet',
        class: "child-item"
      },
      {
        name: 'Cierres',
        url: '/transfer/closing',
        icon: 'nav-icon-bullet',
        class: "child-item"
      }
    ]
  },
  {
    name: 'Notificaciones',
    iconComponent: { name: 'cil-bell' },
    class: 'item',
    url: '/notifications',
    children: [
      {
        name: 'Notificaciones',
        url: '/notifications/mensajes',
        icon: 'nav-icon-bullet',
        class: "child-item"
      },
      {
        name: 'Grupos de Notificaciones',
        url: '/notifications/groups',
        icon: 'nav-icon-bullet',
        class: "child-item"
      },
    ]
  },
  {
    name: 'Seguridad',
    icon: 'cil-shield-alt',
    url: '/seguridad',
    class: "item",
    children: [
      {
        name: 'Seguridad',
        url: '/seguridad/seguridad',
        icon: 'nav-icon-bullet',
        class: "child-item"
      }
    ]
  },
  {
    name: 'Reportes',
    url: '/reportes',
    class: 'item',
    icon: 'cil-print'
  }
];
