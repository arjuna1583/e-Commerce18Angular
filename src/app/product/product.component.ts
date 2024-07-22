import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/model/model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  allProductList: any;
  addEditProductForm!: FormGroup;
  addEditProduct: boolean = false;
  popHeader!: string;
  addProduct!: boolean;
  editProduct!: boolean;
  productData: any;
  singleProduct: any;
  productDetail!: Product;
  editProductId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.getProductList();
  }

  get rf() {
    return this.addEditProductForm.controls;
  }

  getProductList() {
    this.allProductList = this.productService.getAllProduct().subscribe({
      next: (res) => {
        this.allProductList = res;
        console.log('Product List:', this.allProductList);
      },
      error: (error) => console.error('Failed to fetch product data:', error),
    });
  }

  addProductPopup() {
    this.addProduct = true;
    this.editProduct = false;
    this.popHeader = 'Add New Product';
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;

    if (this.addEditProductForm.invalid) {
      return;
    }

    this.productData = this.addEditProductForm.value;
    this.productDetail = {
      id: "",
      name: this.productData.name,
      uploadPhoto: this.productData.uploadPhoto,
      productDesc: this.productData.productDesc,
      mrp: this.productData.mrp,
      dp: this.productData.dp,
      status: this.productData.status,
    };

    this.productService.addProduct(this.productDetail).subscribe({
      next: (res) => {
        alert('Product added successfully:');
        this.getProductList();
        this.addEditProduct = false;
      },
      error: (error) => console.error('Failed to add product:', error),
    });
  }

  editProductPopup(id: any) {
    this.editProduct = true;
    this.addProduct = false;
    this.popHeader = 'Edit Product';
    this.productService.getSingleProduct(id).subscribe({
      next: (res) => {
        this.singleProduct = res;
        this.editProductId = this.singleProduct.id;
        this.addEditProductForm.setValue({
          name: this.singleProduct.name,
          uploadPhoto: this.singleProduct.uploadPhoto,
          productDesc: this.singleProduct.productDesc,
          mrp: this.singleProduct.mrp,
          dp: this.singleProduct.dp,
          status: this.singleProduct.status,
        });
      },
      error: (error) => console.error('Failed to fetch product data:', error),
    });
  }

  updateProductData() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.productData = this.addEditProductForm.value;
    this.productDetail = {
      id: this.editProductId,
      name: this.productData.name,
      uploadPhoto: this.productData.uploadPhoto,
      productDesc: this.productData.productDesc,
      mrp: this.productData.mrp,
      dp: this.productData.dp,
      status: this.productData.status,
    };
    this.productService
      .updateProduct(this.editProductId, this.productDetail)
      .subscribe({
        next: (res) => {
          alert('Product edited successfully:');
          this.getProductList();
          this.addEditProduct = false;
        },
        error: (error) => console.error('Failed to edit product:', error),
      });
  }

  deleteProduct(id: any) {
    let conf = confirm('Are you sure you want to delete this product id? ' + id);
    if (conf) {
      this.productService.deleteProduct(id).subscribe({
        next: (res) => {
          console.log('Product deleted successfully:', res);
          this.getProductList();
        },
        error: (error) => console.error('Failed to delete product:', error),
      });
    } else {
      alert('Cancelled. Product not deleted!');
    }
  }
}
