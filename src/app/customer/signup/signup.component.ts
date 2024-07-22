import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/model/model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule,  } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;
  signUpFormSubmitted: boolean = false;
  href: string = "";
  userData: any;
  userObj!: User;
  userRegData: any;
  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginSignupService) { }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobNumber: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addLine1: ['', Validators.required],
      addLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  get rf() { return this.signUpForm.controls; }

  onSubmitSignUp() {
    this.signUpFormSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    this.userRegData = this.signUpForm.value;
    this.userObj = {
      name: this.userRegData.name,
      mobNumber: this.userRegData.mobNumber,
      age: this.userRegData.age,
      dob: this.userRegData.dob,
      email: this.userRegData.email,
      password: this.userRegData.password,
      address: {
        id: "",
        addLine1: this.userRegData.addLine1,
        addLine2: this.userRegData.addLine2,  
        city: this.userRegData.city,
        state: this.userRegData.state,
        zipCode: this.userRegData.zipCode
      },
      language: this.userRegData.language,
      gender: this.userRegData.gender,
      aboutYou: this.userRegData.aboutYou,
      uploadPhoto: this.userRegData.uploadPhoto,
      agreetc: this.userRegData.agreetc,
      role: this.userRegData.role
    }

    this.loginService.userRegister(this.userObj).subscribe((data: any) => { 
      alert("User Registered Successfully");
      this.router.navigateByUrl('/sign-in');
    })
  }
}
