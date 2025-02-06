import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/api/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent {
  expandedSection: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  private isScrolling = false;

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    // if (this.isScrolling) return;

    // this.isScrolling = true;
    
    // const delta = Math.sign(event.deltaY);
    // const scrollAmount = window.innerHeight; // 100vh
    // window.scrollBy({ top: delta * scrollAmount, behavior: 'smooth' });

    // setTimeout(() => {
    //   this.isScrolling = false;
    // }, 400);
  }

  // Show section content when hovering over a link
  showSection(section: string): void {
    this.expandedSection = section;
  }

  // Hide section content when cursor leaves
  hideSection(): void {
    this.expandedSection = null;
  }

  onLogout(): void {

    this.authService.logout();
    this.router.navigate(['/logout-survey']);
  }

  onGetStarted(): void{
    if(this.authService.checkLoginStatus()){
      this.router.navigate(['/chat']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  navigateToChatbot() {
    this.router.navigate(['/chatbot']);
  } 
}