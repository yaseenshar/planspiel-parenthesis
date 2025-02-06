import { Component } from '@angular/core';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.css']
})
export class VisionComponent {
  // Email address to be displayed with '@' symbol replaced
  email: string = 'info@parenthesis.com';

  // Object to track visibility of content sections
  sectionVisibility: { [key: string]: boolean } = {
    vision: false,
    about: false,
    research: false,
    contact: false
  };

  constructor() {}

  // Toggle visibility of specific content
  toggleContent(section: 'vision' | 'about' | 'research' | 'contact'): void {
    this.sectionVisibility[section] = !this.sectionVisibility[section];
  }

  // Checks if specific section content is visible
  isContentVisible(section: 'vision' | 'about' | 'research' | 'contact'): boolean {
    return this.sectionVisibility[section];
  }

  // Method to replace the '@' symbol in the email
  replaceAtSymbol(email: string): string {
    return email.replace('@', '#at#');
  }
}
