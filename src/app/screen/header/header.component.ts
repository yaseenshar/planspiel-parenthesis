import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/api/authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    // Subscribe to the login status
    this.isLoggedIn = this.authService.checkLoginStatus();
    this.authService.currentUser.subscribe((status) => {      
      this.isLoggedIn = this.authService.checkLoginStatus();
    });
  }

  onLogout(): void {
     this.authService.logout();
     this.router.navigate(['/logout-survey']);
   }

}
