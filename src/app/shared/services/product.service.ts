import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Constant } from '../../core/constant/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = Constant.API_END_POINT_BASE + Constant.END_POINT.PRODUCT + "/";

  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  getAllProduct(): Observable<any> {
    return this.apiService.get(this.productUrl);
  }

  addProduct(productObj: any): Observable<any> {
    return this.apiService.post(this.productUrl, productObj);
  }

  getSingleProduct(id: any) {
    return this.apiService.get(this.productUrl + id);
  }

  updateProduct(id: any, productObj: any): Observable<any> {
    return this.apiService.put(this.productUrl + id, productObj);
  }

  deleteProduct(id: any): Observable<any> {
    return this.apiService.delete(this.productUrl + id);
  }
}
