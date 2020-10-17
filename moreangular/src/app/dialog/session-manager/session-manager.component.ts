import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-session-manager',
  templateUrl: './session-manager.component.html',
  styleUrls: ['./session-manager.component.css']
})
export class SessionManagerComponent implements OnInit {
  @Input() time: number;
  constructor(
    public modal: NgbActiveModal,
    private service: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.service.logout();
    this.modal.close();
  }
}
