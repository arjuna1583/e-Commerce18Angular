import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

// admin before login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role?.toLowerCase() == 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

// admin after login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role?.toLowerCase() == 'admin') {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}

// customer (buyer/seller) before login check
@Injectable({
  providedIn: 'root',
})
export class SellerBuyerAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role?.toLowerCase() == 'seller') {
      this.router.navigate(['/seller-dashboard']);
      return false;
    } else if (role?.toLowerCase() == 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

// Customer (Buyer) after login check
@Injectable({
  providedIn: 'root',
})
export class BuyerAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role?.toLowerCase() == 'buyer') {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

// Customer (Seller) after login check
@Injectable({
  providedIn: 'root',
})
export class SellerAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role?.toLowerCase() == 'seller') {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
