import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  registerForm: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }
  
  onSubmit() {
    this.auth.registerUser(this.registerForm.value).then(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => console.log(err)
    )
  }
}
