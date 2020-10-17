import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagePreviewComponent } from '../../dialog/image-preview/image-preview.component';
import { DeleteEmployeeComponent } from 'src/app/dialog/delete-employee/delete-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('takeInput', { static: false }) InputVar: ElementRef;
  defaultSearchByOption: any = { value: 'developer', viewValue: 'Developer' };
  selectedSearchByOptions: any = { ...this.defaultSearchByOption };
  searchByOptionList: any[] = [
    { value: 'developer', viewValue: 'Developer' },
    { value: 'designer', viewValue: 'Desginer' },
    { value: 'Manager', viewValue: 'Manager' }
  ];

  data = [];
  p: number = 1;
  from: FormGroup;
  submitForm = false;
  subscription: Subscription[] = [];
  id: string;
  fileData;
  search: string;
  previewUrl: any;
  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getData();
    this.createForm();
    this.route.queryParams.subscribe(res => {
      if (res.id !== undefined) {
        this.getById(res.id);
      }
    });
  }
  compareSearchByOption(object1: any, object2: any) {
    return object1 && object2 && object1.text === object2.text && object1.value === object2.value;
  }

  createForm() {
    this.from = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'image': new FormControl(null, [Validators.required]),
      'role': new FormControl(this.selectedSearchByOptions, [Validators.required]),
    })
  }

  getData() {
    const data = JSON.parse(localStorage.getItem('sorted'));
    this.subscription.push(this.service.getData().subscribe((res) => {
      this.data = res;
    }, (err => {
    })
    )
    )
  }

  addEmployee() {
    this.spinner.showSpinner();
    if (!this.submitForm) {
      this.subscription.push(this.service.createEmployee(this.from.value).subscribe(res => {
        this.getData();
        this.from.reset();
        this.previewUrl = '';
        this.InputVar.nativeElement.value = "";
        this.from.controls.role.setValue(this.selectedSearchByOptions);
      }, (err => { })
      )
      )
    }
    else {
      this.subscription.push(this.service.updateEmployee(this.from.value, this.id).subscribe(res => {
        this.from.reset();
        this.getData();
        this.previewUrl = '';
        this.InputVar.nativeElement.value = "";
        this.from.controls.role.setValue(this.selectedSearchByOptions);
        this.submitForm = false;
      })
      )
    }
  }

  onChange(event: any) {
    this.fileData = event.target.files[0] as File;
    this.preview();
  }

  preview() {
    if (this.fileData) {
      const obj: any = {};
      obj.fileInformation = this.fileData;
      obj.fileName = obj.fileInformation.name;
      obj.fileType = obj.fileInformation.type;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
        obj.base64 = reader.result;
        obj.base64Data = (String(obj.base64).split('base64,')[1]);
        this.from.controls.image.setValue(obj);
      };
    }
    else {
      this.previewUrl = '';
    }
  }

  getById(id) {
    this.subscription.push(this.service.getByID(id).subscribe(
      (res: any) => {
        const data = [];
        data.push(res);
        this.data = data;
      }
    )
    );
  }

  deleteEmployee(ele) {
    const modalRef = this.modalService.open(DeleteEmployeeComponent);
    modalRef.componentInstance.employee = ele;
    modalRef.componentInstance.clickevent.subscribe((res) => {
      this.getData();
      this.spinner.showSpinner();
    })
  }

  clearfilter() {
    localStorage.removeItem('sorted');
    this.getData();
  }

  update(ele) {
    this.from.controls.name.setValue(ele.name);
    this.id = ele._id;
    this.submitForm = true;
  }

  showPreview(ele) {
    const modalRef = this.modalService.open(ImagePreviewComponent);
    modalRef.componentInstance.image = ele.image.base64;
  }

  onSort(event) {
    if (event.value == "desending") {
      this.subscription.push(this.service.sortProduct(1).subscribe((res: any) => {
        this.data = res;
        localStorage.setItem('sorted', JSON.stringify(this.data));
      })
      )
    }
    else {
      this.subscription.push(this.service.sortProduct(-1).subscribe((res: any) => {
        this.data = res;
        localStorage.setItem('sorted', JSON.stringify(this.data))
      })
      )
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
