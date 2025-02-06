import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/api/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  onSubmit() {
    
    this.authService
      .forgotPassword({ email: this.email })
      .subscribe(
        (response) => {
          this.errorMessage = response.message;
          //this.router.navigate(['/reset-password']);
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
