import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  @Input() sidenavLayout: any;

  constructor(private sideNavService: SideNavService) {
  }

  ngOnInit() {
    // this.sideNavService.sideNavToggleSubject.subscribe(() => {
    //   this.sidenav.toggle();
    // });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
