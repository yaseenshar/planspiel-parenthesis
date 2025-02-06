import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/api/authentication/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.route.params.subscribe((params) => (this.token = params['token']));
  }

  onSubmit() {

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.resetPassword({ token: this.token, newPassword: this.newPassword })
    .subscribe(
      (response) => {
        this.errorMessage = response.message;
        //this.router.navigate(['/login']);
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
