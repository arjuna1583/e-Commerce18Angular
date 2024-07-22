import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constant } from '../../core/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private singleProductId = new BehaviorSubject(null)
currentProductId = this.singleProductId.asObservable()

  constructor(private apiService: ApiService) { }

  getAllProduct(): Observable<any> {
    return this.apiService.get(Constant.API_END_POINT_BASE + Constant.END_POINT.PRODUCT + '/');
  }

  quickBuyProduct(productId: any) {
    this.singleProductId.next(productId)
  }

  singleProduct(productId: any) {
    return this.apiService.get(Constant.API_END_POINT_BASE + Constant.END_POINT.PRODUCT + '/' + productId);
  }

  productList(): Observable<any> {
    return this.apiService.get(Constant.API_END_POINT_BASE + Constant.END_POINT.PRODUCT + '/');
  }
  
  userDetail(userId: any) {
    return this.apiService.get(Constant.API_END_POINT_BASE + Constant.END_POINT.USER + '/' + userId);
  }

  addNewOrder(orderObj: any): Observable<any> {
    return this.apiService.post(Constant.API_END_POINT_BASE + Constant.END_POINT.ORDER + '/', orderObj);
  }

  orderList(): Observable<any> {
    return this.apiService.get(Constant.API_END_POINT_BASE + Constant.END_POINT.ORDER + '/');
  }
}
