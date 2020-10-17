import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDocmentComponent } from './add-docment.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { NoDataModule } from '../no-data/no-data.module';
import { DndDirective } from 'src/app/shared/drag-drop-driective';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes: Routes = [
  {
    path: '',
    component: AddDocmentComponent
  }
]

@NgModule({
  declarations: [
    AddDocmentComponent,
    DndDirective
  ],

  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    NoDataModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class AddDocumentModule { }
