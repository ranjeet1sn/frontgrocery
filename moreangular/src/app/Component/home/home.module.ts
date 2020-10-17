import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { NoDataModule } from '../no-data/no-data.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
 {
   path:'**',
   component:HomeComponent
 }
]
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatSelectModule,
    NoDataModule,
    Ng2SearchPipeModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
