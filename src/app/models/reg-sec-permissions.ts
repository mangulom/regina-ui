export class RegSecPermissions {
  menuId?: number;
  menuLabel?: string;
  menuIcon?: string;
  menuRoute?: string | null;
  menuParentId?: number | null;
  menuExpanded?: boolean=false;
  permitView?: boolean;
  permitCreate?: boolean;
  permitEdit?: boolean;
  permiteDelete?: boolean;
}
