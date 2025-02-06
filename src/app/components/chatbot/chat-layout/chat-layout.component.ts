import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../../services/api/botpress/chatbot.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss'
})
export class ChatLayoutComponent implements OnInit {
  conversations: any[] = [];
  activeConversationId: string | null = null;

  constructor(private chatbotService: ChatbotService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.chatbotService.initializeClient();
    this.conversations = await this.chatbotService.listConversations();
  }

  onConversationSelected(conversationId: string): void {
    this.activeConversationId = conversationId;
    // Navigate to the selected conversation
    this.router.navigate(['/chat/conversation', conversationId]);
  }

  onMenuChange(menu: string): void{
    switch(menu?.toLowerCase()){
      case "reports":{
        this.router.navigate([`/chat/documents`]);
        return;
      }
      case "insights":{
        this.router.navigate([`/chat/userInsights`]);
        return;
      }
      case "support":{
        this.router.navigate([`/chat/conversation/${this.activeConversationId}/talkToAHuman`]);
        return;
      }
      case "conversation_summary":{
        this.router.navigate([`/chat/summaries`]);
        return;
      }
      default:{
        return;
      }
    }
  }
}
