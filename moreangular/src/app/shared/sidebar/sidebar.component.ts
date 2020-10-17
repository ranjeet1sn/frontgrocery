import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  authenticated = false;
  constructor(
    private commonService: CommonService,
    public auth: AuthService
  ) {
    this.commonService.toggleSidenav.subscribe(res => {
      if (res) {
        this.openSidenav();
      }
    });
  }

  ngOnInit() {
  }

  openSidenav() {
    this.sidenav.toggle();
  }
}
