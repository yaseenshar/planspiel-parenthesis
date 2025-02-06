import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/authentication/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          this.router.navigate(['/chat']);
        },
        (error) => {
          this.errorMessage = error.error.message;
          //error.message
          //error.ok
          //error.status
          //error.statusText
        }
      );
  }
}
