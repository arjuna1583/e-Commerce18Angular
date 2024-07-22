import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Constant } from '../../core/constant/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getUserById(userId: any) {
    return this.apiService.get(`${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}/${userId}`);
  }

  updateUser(userId: any, userObj: any) : Observable<any> {
    return this.apiService.put(`${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}/${userId}`, userObj);
  }
}
