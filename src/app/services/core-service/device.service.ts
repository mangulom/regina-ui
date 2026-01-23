import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() {
    const userAgent = navigator.userAgent;
    this.isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  }

  private readonly isMobile: boolean;
  isMobileDevice(): boolean {
    return this.isMobile;
  }

  isDesktopDevice(): boolean {
    return !this.isMobile;
  }
}
