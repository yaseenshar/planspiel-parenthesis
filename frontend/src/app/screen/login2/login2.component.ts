import { Component } from '@angular/core';
import { AuthService } from '../../services/api/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.scss'
})
export class Login2Component {

  email = '';
  password = '';
  rememberMe = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {

    const payload = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    };

    this.authService
      .login(payload)
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
