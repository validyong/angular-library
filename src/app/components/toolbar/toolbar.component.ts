import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  title: string = "The library";

  constructor(private sideNavService: SideNavService) { }

  clickMenu() {
    this.sideNavService.toggle();
  }

  ngOnInit(): void {
  }

}
