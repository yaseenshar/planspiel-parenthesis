import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../../services/api/email/email.service';
import { AuthService } from '../../../services/api/authentication/auth.service';

@Component({
  selector: 'app-talk-to-a-human',
  templateUrl: './talk-to-a-human.component.html',
  styleUrl: './talk-to-a-human.component.scss'
})
export class TalkToAHumanComponent implements OnInit {
    chatSummary: string = "";
    userMessage: string = "";
    userEmail: string = "";
    error: string = "";
    success: string = "";

    constructor(private authService: AuthService, private emailService: EmailService) {
      const currentUser = this.authService.currentUser; 
      if (currentUser) {
        this.userEmail = "";
      }
    }

    ngOnInit() {
        this.generateChatSummary();
    }

    generateChatSummary() {
        // Logic to generate summary (mocked for now)
        this.chatSummary = "This is a summary of your recent interactions...";
    }

    downloadSummary() {
        const blob = new Blob([this.chatSummary], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'chat_summary.txt';
        link.click();
    }

    sendToAdmin() {
      if(!this.userMessage){
        this.error = "Please type in your message to send."
        this.resetAlerts();
        return;
      }

      const body = {
        userEmail: this.userEmail,
        userMessage: this.userMessage,
        summary: this.chatSummary
      }

      this.emailService.escalateToAdmin(body).subscribe(
          response => this.success = "Your request has been sent to the admin.",
          error => this.error = "Sorry! We are experiencing some problems. Please try again later."
      );

      this.resetAlerts();
    }

    resetAlerts(){      
      setTimeout(()=>{
        this.error="";
        this.success=""
      }, 4000);
    }
}
