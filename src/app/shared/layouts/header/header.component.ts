import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
loggedIn = false;
language: string = 'English';
userRole!: any;

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.userRole = sessionStorage.getItem('role');
    this.userRole = this.userRole?.toLowerCase();

    const userSessionId = sessionStorage.getItem('userSessionId');
    if (userSessionId) {
      this.loggedIn = true;
    }
  }

  logout() {
    sessionStorage.removeItem('userSessionId');
    sessionStorage.removeItem('role');
    this.router.navigateByUrl('/sign-in');
    location.reload();
  }
}
