import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/authentication/auth.service';
import { ChatbotService } from '../../services/api/botpress/chatbot.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  subscription = true;

  constructor(private authService: AuthService, private router: Router, private chatService: ChatbotService) { }

  onSignup(): void {

    this.chatService.createUser(this.lastName).then(user => {

      console.log('User created: ' + user);
      console.log(user);

      this.authService
        .signup({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password, botpressId: user.id, botpressToken: user.key, subscription: this.subscription })
        .subscribe(
          (response) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            alert('Signup failed');
          }
        );

    });
  }
}
