import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css',
})
export class BuyerDashboardComponent implements OnInit {
  allProducts: any;
  showCheckout: boolean = false;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.customerService.getAllProduct().subscribe({
      next: (res) => {
        this.allProducts = res;
      },
      error: (error) => console.error('Failed to fetch product data:', error),
    });
  }

  buyProduct(productId: any) {
    this.showCheckout = true;
    this.customerService.quickBuyProduct(productId);
    this.router.navigateByUrl('/checkout');
  }

  addToCart() {
    alert('Added to cart');
  }
}
