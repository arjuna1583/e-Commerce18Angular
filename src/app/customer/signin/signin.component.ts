import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signInForm!: FormGroup;
  href: string = '';
  userData: any;
  signInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginSignupService
  ) {}

  ngOnInit(): void {}

  onSubmitSignIn() {
    this.loginService
      .authLogin(this.signInFormValue.email, this.signInFormValue.password)
      .subscribe(
        (data: any) => {
          this.userData = data;
          if (this.userData.length == 1) {
            if (this.userData[0].role.toLowerCase() == 'seller') {
              sessionStorage.setItem('userSessionId', this.userData[0].id);
              sessionStorage.setItem('role', this.userData[0].role);
              this.router.navigateByUrl('/seller-dashboard');
            } else if (this.userData[0].role.toLowerCase() == 'buyer') {
              sessionStorage.setItem('userSessionId', this.userData[0].id);
              sessionStorage.setItem('role', this.userData[0].role);
              this.router.navigateByUrl('/buyer-dashboard');
            } else {
              alert('Invalid login details');
            }
          } else {
            alert('Invalid User');
          }
        },
        (error) => {
          console.error('error', error);
        }
      );
  }
}
