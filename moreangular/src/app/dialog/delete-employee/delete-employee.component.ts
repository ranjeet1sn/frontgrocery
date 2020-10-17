import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit ,OnDestroy{
  @Output() clickevent = new EventEmitter<string>();
  @Input() employee: any;
  subscription: Subscription[] = [];
  constructor(public modal: NgbActiveModal,
    private service: ApiService) { }

  ngOnInit() {
  }
  deleteEmployee(id: string) {
    this.subscription.push(this.service.deleteEmployee(id).subscribe(
      res => {
        this.modal.close();
        this.clickevent.emit('success');
      }
    ));
  }

  ngOnDestroy(){
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
