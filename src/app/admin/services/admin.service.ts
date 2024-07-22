import { Injectable } from '@angular/core';
import { Constant } from '../../core/constant/constant';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public userUrl = `${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}/`;
  public productUrl = `${Constant.API_END_POINT_BASE}${Constant.END_POINT.PRODUCT}/`;
  public allUserUrl = `${Constant.API_END_POINT_BASE}${Constant.END_POINT.USER}`;

  constructor(private apiService: ApiService) { }

  userDashboard() {
    return this.apiService.get(this.userUrl);
  }

  productDashboard() {
    return this.apiService.get(this.productUrl);
  }

  allUser(): Observable<any> {
    return this.apiService.get(this.allUserUrl);
  }

  addUser(userObj: any) {
    return this.apiService.post(this.userUrl, userObj);
  }

  getSingleUser(id: any) {
    return this.apiService.get(this.userUrl + id);
  }

  updateUser(id: any, userObj: any): Observable<any> {
    return this.apiService.put(this.userUrl + id, userObj);
  }

  deleteUser(id: any) {
    return this.apiService.delete(this.userUrl + id);
  }
}
