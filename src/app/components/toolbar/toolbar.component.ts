import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  title: string = "The library";
  @Output () sidenavToggle = new EventEmitter<void>();

  constructor(private sideNavService: SideNavService) { }

  clickMenu() {
    this.sidenavToggle.emit();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnInit(): void {
  }

}
