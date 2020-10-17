import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('src/app/Component/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/Component/login/login.module').then(m => m.LoginModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/Component/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'document',
    loadChildren: () => import('src/app/Component/add-docment/add-document.module').then(m => m.AddDocumentModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
