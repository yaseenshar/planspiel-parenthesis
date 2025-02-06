import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/api/authentication/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userProfile: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
        console.log(this.userProfile);
      },
      (error) => {
        console.error('Failed to load profile', error);
      }
    );
  }
}
