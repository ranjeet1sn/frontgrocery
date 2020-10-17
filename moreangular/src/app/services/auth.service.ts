import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  registerUser(data) {
    return this.auth.auth.createUserWithEmailAndPassword(data.email, data.password).then(
      res => {
      }
    )
  }

  loginUser(data) {
    return this.auth.auth.signInWithEmailAndPassword(data.email, data.password).then(
      (res) => {
        this.auth.authState.subscribe((res: any) => {
          localStorage.setItem('authToken', JSON.stringify(res));
          this.router.navigate(['/']);
        })
      }
    )
  }

  getToken() {
    const token = localStorage.getItem('authToken');
    return token;
  }

  isAuthenticated(){
    const token = localStorage.getItem('authToken');
    return token !=null;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
