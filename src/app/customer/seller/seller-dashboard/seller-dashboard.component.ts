import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css',
})
export class SellerDashboardComponent implements OnInit {
  orderList: any;
  totalOrder: any;
  lastOrderDate: any;
  productList: any;
  totalProduct: number = 0;
  publishProduct: number = 0;
  inactiveProduct: number = 0;
  draftProduct: number = 0;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.sellerOrderData();
    this.sellerProductData();
  }

  sellerProductList() {
    this.router.navigateByUrl('/seller/product');
  }

  sellerOrderList() {
    alert('This option will be only for VIP candidates');
    // this.router.navigateByUrl('/seller/order');
  }

  sellerOrderData() {
    this.customerService.orderList().subscribe({
      next: (res) => {
        this.orderList = res;
        // console.log('Order List', this.orderList);
        this.totalOrder = Number(this.orderList.length);
        this.lastOrderDate = this.orderList[this.totalOrder - 1].dateTime;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  sellerProductData() {
    this.customerService.productList().subscribe({
      next: (res) => {
        this.productList = res;
        this.productList.forEach((product: any) => {
          // console.log(product.status);
          switch (product.status) {
            case 'publish':
              this.publishProduct++;
              break;
            case 'draft':
              this.draftProduct++;
              break;
            case 'inactive':
              this.inactiveProduct++;
              break;
          }
        });
        this.totalProduct = this.productList.length;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
