import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../core/constant/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginSignupService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  authLogin(email: string, password: string) {
    return this.apiService.get(
      `${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}?email=${email}&password=${password}`
    );
  }

  userRegister(userObj: any): Observable<any> {
    return this.apiService.post(`${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}`, userObj);
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.apiService.get(
      `${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}?email=${email}&password=${password}&role=admin`
    );
  }
}
