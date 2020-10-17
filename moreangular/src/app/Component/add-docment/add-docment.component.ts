import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as _ from 'lodash'
import { SpinnerService } from 'src/app/services/spinner.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-docment',
  templateUrl: './add-docment.component.html',
  styleUrls: ['./add-docment.component.css']
})
export class AddDocmentComponent implements OnInit ,OnDestroy {
  data: any;
  document = [];
  condition = false;
  files: any[] = [];
  condtion = true;
  subscription: Subscription[] = [];
  constructor(
    private sevice: ApiService,
    private spinner: SpinnerService,

  ) { }

  ngOnInit() {
    this.getRecord();
  }

  getRecord() {
    this.subscription.push(this.sevice.getDocument().subscribe((res: any) => {
      res.data.forEach(element => {
        this.document.push(element);
        this.document.forEach(ele => {
          ele.data = atob(ele.data);
        });
      });
    })
    )
  }

  savefile() {
    this.spinner.showSpinner();
    const reader = new FileReader();
    reader.onload = (_event: any) => {
      this.data = _event.target.result;
      const data = btoa(this.data);
      this.data = this.data.trim();
      this.subscription.push(this.sevice.saveDocument(data).subscribe(res => {
        this.getRecord();
        this.files = [];
        this.condition=false;
      })
      );
    }
    reader.readAsBinaryString(this.files[0]);
  }

  deleteRecord(id: string, i) {
    this.subscription.push(this.sevice.deleteRecord(id).subscribe(res => {
      this.spinner.showSpinner();
      this.document.splice(i, 1);
    })
    );
  }


  onFileDropped($event) {
    this.condition = true
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
  }
  cancel(){
    this.files=[];
    this.condition=false;
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
