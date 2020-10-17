import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionManagerComponent } from './dialog/session-manager/session-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private bnIdle: BnNgIdleService,
    private modalService: NgbModal
  ) {
  }
  ngOnInit() {
    this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        const modalRef = this.modalService.open(SessionManagerComponent, {
          backdrop: 'static',
          keyboard: false
        });
        modalRef.componentInstance.time = 1;
      }
    });
  }
}
