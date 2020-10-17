import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showCondtion = false;
  constructor(
    private router: Router,
    private service: AuthService,
    private commonService: CommonService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/login') {
          this.showCondtion = true;
        }
        else {
          this.showCondtion = false;
        }
      }
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.service.logout();
  }
  onClick() {
    this.commonService.toggleSidenav.next('click');
  }
}
