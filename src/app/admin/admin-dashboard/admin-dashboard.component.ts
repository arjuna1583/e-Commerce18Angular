import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  userDashboardData: any;
  totalUser: number = 0;
  adminUser: number = 0;
  sellerUser: number = 0;
  buyerUser: number = 0;

  productDashboardData: any;
  totalProduct: number = 0;
  publishProduct: number = 0;
  inactiveProduct: number = 0;
  draftProduct: number = 0;

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminProductDashboard();
    this.adminUserDashboard();
  }

  userDashboard() {
    this.router.navigateByUrl('/admin/user');
  }

  productDashboard() {
    this.router.navigateByUrl('/admin/product');
  }

  adminUserDashboard() {
    this.adminService.userDashboard().subscribe(
      (users) => {
        this.userDashboardData = users;
        this.updateUserRoles();
      },
      (error) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  private updateUserRoles() {
    this.userDashboardData.forEach((user: any) => {
      switch (user.role.toLowerCase()) {
        case 'admin':
          this.adminUser++;
          break;
        case 'seller':
          this.sellerUser++;
          break;
        case 'buyer':
          this.buyerUser++;
          break;
      }
      this.totalUser++;
    });
  }

  private adminProductDashboard() {
    this.adminService.productDashboard().subscribe(
      (productData) => {
        this.productDashboardData = productData;
        this.countProductStatuses();
      },
      (error) => {
        console.error('Failed to fetch product data:', error);
      }
    );
  }

  private countProductStatuses() {
    this.totalProduct = 0;
    this.publishProduct = 0;
    this.inactiveProduct = 0;
    this.draftProduct = 0;

    this.productDashboardData.forEach((product: any) => {
      switch (product.status.toLowerCase()) {
        case 'publish':
          this.publishProduct++;
          break;
        case 'inactive':
          this.inactiveProduct++;
          break;
        case 'draft':
          this.draftProduct++;
          break;
      }
      this.totalProduct++;
    });
  }
}
