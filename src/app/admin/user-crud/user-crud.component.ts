import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/model/model';

declare var $: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css',
})
export class UserCrudComponent implements OnInit {
  allUser: any;
  singleUser: any;
  addEditUserForm!: FormGroup;
  userDetails!: User;
  userRegData: any;
  editUserId: any;
  uploadFileName!: string;
  addEditUser: boolean = false; // For form validation
  addUser: boolean = false;
  editUser: boolean = false;
  popupHeader!: string;
  signInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();

    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
      role: ['', Validators.required],
    });
  }

  getAllUsers() {
    this.adminService.allUser().subscribe(
      (res: any) => {
        this.allUser = res;
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPopup() {
    this.addUser = true;
    this.editUser = false;
    this.popupHeader = 'Add New User';

    this.addEditUserForm.reset();
  }

  addUserForm() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('Error! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.userRegData = this.addEditUserForm.value;
    this.userDetails = {
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
        zipCode: this.userRegData.zipCode,
      },
      language: this.userRegData.language,
      gender: this.userRegData.gender,
      aboutYou: this.userRegData.aboutYou,
      uploadPhoto: this.userRegData.uploadPhoto,
      agreetc: this.userRegData.agreetc,
      role: this.userRegData.role,
    };
    this.adminService.addUser(this.userDetails).subscribe(
      (data: any) => {
        this.addEditUserForm.reset();
        this.getAllUsers();
        $('#addUserModal').modal('toggle');
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  editUserPopup(userId: any) {
    this.editUserId = userId;
    this.addUser = false;
    this.editUser = true;
    this.popupHeader = 'Edit User';
    this.adminService.getSingleUser(userId).subscribe(
      (data: any) => {
        this.singleUser = data;
        this.uploadFileName = this.singleUser.uploadPhoto;
        this.addEditUserForm.setValue({
          name: this.singleUser.name,
          mobNumber: this.singleUser.mobNumber,
          age: this.singleUser.age,
          dob: this.singleUser.dob,
          email: this.singleUser.email,
          password: this.singleUser.password,
          addLine1: this.singleUser.address.addLine1,
          addLine2: this.singleUser.address.addLine2,
          city: this.singleUser.address.city,
          state: this.singleUser.address.state,
          zipCode: this.singleUser.address.zipCode,
          language: this.singleUser.language,
          gender: this.singleUser.gender,
          aboutYou: this.singleUser.aboutYou,
          uploadPhoto: '',
          agreetc: this.singleUser.agreetc,
          role: this.singleUser.role,
        });
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  editUserForm() {
    if (this.addEditUserForm.invalid) {
      alert('Error! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.userRegData = this.addEditUserForm.value;
    this.userDetails = {
      name: this.userRegData.name,
      mobNumber: this.userRegData.mobNumber,
      age: this.userRegData.age,
      dob: this.userRegData.dob,
      email: this.userRegData.email,
      password: this.userRegData.password,
      address: {
        id: this.singleUser.address.id, // Use the existing address ID
        addLine1: this.userRegData.addLine1,
        addLine2: this.userRegData.addLine2,
        city: this.userRegData.city,
        state: this.userRegData.state,
        zipCode: this.userRegData.zipCode,
      },
      language: this.userRegData.language,
      gender: this.userRegData.gender,
      aboutYou: this.userRegData.aboutYou,
      uploadPhoto:
        this.userRegData.uploadPhoto == ''
          ? this.uploadFileName
          : this.userRegData.uploadPhoto,
      agreetc: this.userRegData.agreetc,
      role: this.userRegData.role,
    };
    this.adminService.updateUser(this.editUserId, this.userDetails).subscribe(
      (data: any) => {
        this.addEditUserForm.reset();
        this.getAllUsers();
        $('#addUserModal').modal('toggle');
      },
      (error) => {
        console.error('Failed to update user data:', error);
      }
    );
  }

  deleteUser(userId: any) {
    this.adminService.deleteUser(userId).subscribe(
      (data: any) => {
        this.getAllUsers();
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }
}
