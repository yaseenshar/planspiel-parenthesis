import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @ViewChild('chatWindow') private chatWindow!: ElementRef;
  messages: { from: string, text: string }[] = [];
  userMessage: string = '';
  loading: boolean = false;
  chatMessages: { sender: string; message: string }[] = [
    { sender: 'bot', message: 'Hello! I’m your AI Security Assistant. How can I help you today?' },
  ];

  sendMessage() {
    try
    {
      if (this.userMessage.trim()) {
        this.chatMessages.push({ sender: 'user', message: this.userMessage });
        this.scrollToBottom(); // Scroll to the bottom after sending the message
  
        this.loading = true;
        
        setTimeout(() => {
          this.chatMessages.push({
            sender: 'bot',
            message: 'Thanks for your input. Let me analyze that!',
          });
          this.loading = false;
          this.scrollToBottom(); // Scroll to the bottom after the bot responds
        }, 1000);
  
        this.userMessage = '';
      }
    }
    catch(error)
    {
      this.loading = false;
      console.log(error)
    }
  }

  // Scroll to the bottom of the chat container
  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    });
  }

  quickReply(message: string) {
    this.userMessage = message;
    this.sendMessage();
  }
}
