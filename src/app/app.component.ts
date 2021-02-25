import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from './services/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-library';
  @Output() sidenavToggle = new EventEmitter<boolean> ();

  constructor() {

  }

  openMenu = false;

  clickMenu() {
    this.openMenu = !this.openMenu;
    this.sidenavToggle.emit(this.openMenu);
  }

  ngOnInit() {

  }
}
