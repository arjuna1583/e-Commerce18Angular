import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/model/model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: boolean = false;
  userId!: number;
  userData: any;
  userUpdateData: any;
  userDetails!: User;
  userProfilePicture: any;
  userLanguage: any;
  userRole: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void { 
    this.userId = Number(sessionStorage.getItem('userSessionId'));

    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      addLine1: ['', Validators.required],
      addLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.editUserProfile(this.userId);
  }

  get uf() { return this.userProfileForm.controls; }

  editUserProfile(userId: any) {
    this.userService.getUserById(userId).subscribe((data: any) => {
      this.userDetails = data;
      this.userProfilePicture = this.userDetails.uploadPhoto;
      this.userLanguage = this.userDetails.language;
      this.userRole = this.userDetails.role;
      this.userProfileForm.setValue({
        name: this.userDetails.name,
        mobNumber: this.userDetails.mobNumber,
        age: this.userDetails.age,
        dob: this.userDetails.dob,
        email: this.userDetails.email,
        password: this.userDetails.password,
        addLine1: this.userDetails.address.addLine1,
        addLine2: this.userDetails.address.addLine2,
        city: this.userDetails.address.city,
        state: this.userDetails.address.state,
        zipCode: this.userDetails.address.zipCode,
        language: this.userDetails.language,
        gender: this.userDetails.gender,
        aboutYou: this.userDetails.aboutYou,
        uploadPhoto: '',
        role: this.userDetails.role
      });
    }, error => console.error("Failed to fetch user data:", error));
  }

  updateUserProfile() {

    this.userProfile = true;
    if (this.userProfileForm.invalid) {
      return;
    }
      
    this.userUpdateData = this.userProfileForm.value;
    this.userData = {
      name: this.userUpdateData.name,
      mobNumber: this.userUpdateData.mobNumber,
      age: this.userUpdateData.age,
      dob: this.userUpdateData.dob,
      email: this.userUpdateData.email,
      password: this.userUpdateData.password,
      address: {
        addLine1: this.userUpdateData.addLine1,
        addLine2: this.userUpdateData.addLine2,
        city: this.userUpdateData.city,
        state: this.userUpdateData.state,
        zipCode: this.userUpdateData.zipCode
      },
      language: this.userUpdateData.language,
      gender: this.userUpdateData.gender,
      aboutYou: this.userUpdateData.aboutYou,
      uploadPhoto: this.userProfilePicture || this.userUpdateData.uploadPhoto,
      role: this.userUpdateData.role
    }

    this.userService.updateUser(this.userId, this.userData).subscribe((data: any) => {
      alert("User profile updated successfully");

      if (this.userRole.toLowerCase() == 'admin') {
        this.router.navigateByUrl('/admin-dashboard');
      }
      else if (this.userRole.toLowerCase() == 'seller') {
        this.router.navigateByUrl('/seller-dashboard');
      } else if (this.userRole.toLowerCase() == 'buyer') {
        this.router.navigateByUrl('/buyer-dashboard');
      }
    }, error => console.error("Failed to update user data:", error));
  }
}
