import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private service: AuthService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.getToken();
    const copiedReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    return next.handle(copiedReq)
      .pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log(err);
              this.service.logout();
            }
            else {
              console.log(err.message);
            }
          }
          return of(err);
        }));
  }
}
