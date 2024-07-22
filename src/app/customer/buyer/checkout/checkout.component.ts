import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, Product, User } from '../../../core/model/model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  singleProductId: any;
  userId: any;
  singleProduct!: Product;
  userDetail!: User;
  userAddressDetail: any;
  userContactNumber: any;
  orderObj!: Order;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.currentProductId.subscribe(product => this.singleProductId = product);
    this.userId = sessionStorage.getItem('userSessionId');
    this.getProductDetail(this.singleProductId);
    this.userAddress(this.userId);
  }

  getProductDetail(singleProductId: any) {
    this.customerService.singleProduct(singleProductId).subscribe({
      next: (res: any) => {
        this.singleProduct = res;
        console.warn('single product', this.singleProduct);
      },
      error: (error) => console.error('Failed to fetch product data:', error),
    });
  }

  userAddress(userId: any) { 
    this.customerService.userDetail(userId).subscribe({
      next: (res: any) => {
        this.userAddressDetail = res.address;
        this.userContactNumber = res.mobNumber;
      },
      error: (error) => console.error('Failed to fetch product data:', error),
    });
  }

  placeOrder() {
    this.orderObj = {
      id: "",
      userId: this.userId,
      sellerId: 2,  //this.singleProduct.id,
      product: {
        id: this.singleProduct.id,
        name: this.singleProduct.name,
        uploadPhoto: this.singleProduct.uploadPhoto,
        productDesc: this.singleProduct.productDesc,
        mrp: this.singleProduct.mrp,
        dp: this.singleProduct.dp,
        status: this.singleProduct.status
      },
      deliveryAddress: {
        id: "",
        addLine1: this.userAddressDetail.addLine1,
        addLine2: this.userAddressDetail.addLine2,
        city: this.userAddressDetail.city,
        state: this.userAddressDetail.state,
        zipCode: this.userAddressDetail.zipCode
      },
      contact: this.userContactNumber,
      dateTime: new Date().toLocaleDateString(),
    };

    // console.log('orderObj', this.orderObj);

    this.customerService.addNewOrder(this.orderObj).subscribe({
      next: (res) => {
        alert('Order placed successfully');
        this.router.navigateByUrl('/buyer-dashboard');
      },
      error: (error) => console.error('Failed to fetch product data:', error),
    });
  }
    
}
