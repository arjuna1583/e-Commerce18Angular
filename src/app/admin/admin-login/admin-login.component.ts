import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  signInFormValue: any = {};
  userData: any;

  constructor(
    private router: Router,
    private loginService: LoginSignupService
  ) {}
  ngOnInit(): void {}

  onSubmitSignIn() {
    this.loginService.adminLogin(this.signInFormValue.email, this.signInFormValue.password).subscribe({
      next: (res: any) => {
        if (res && res.enabled) {
          this.userData = res;
          if (this.userData && this.userData.length == 1) {
            sessionStorage.setItem('userSessionId', this.userData[0].id);
            sessionStorage.setItem('role', this.userData[0].role);
            this.router.navigateByUrl('/admin-dashboard');
          } else {
            alert('Invalid login details');
          }
        }
      },
      error: (error) => {
        console.error('error', error);
      }
    });
  }
}
