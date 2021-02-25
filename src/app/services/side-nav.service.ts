import { Injectable, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private sidenav!: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  constructor() { }

  public toggle() {
    return this.sidenav.toggle();
  }
}
