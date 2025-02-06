import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  expandedSection: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // Show section content when hovering over a link
  showSection(section: string): void {
    this.expandedSection = section;
  }

  // Hide section content when cursor leaves
  hideSection(): void {
    this.expandedSection = null;
  }

  

  navigateToChatbot() {
    this.router.navigate(['/chatbot']);
  } 

  
}