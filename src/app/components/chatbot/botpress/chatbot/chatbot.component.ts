import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../../../services/api/botpress/chatbot.service'; 

@Component({
  selector: 'app-botpress-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class BotPressChatbotComponent implements OnInit {
  conversationId!: string;
  messages: { text: string; isBot: boolean }[] = [];
  userMessage = '';

  constructor(private chatbotService: ChatbotService) {}

  async ngOnInit(): Promise<void> {
    await this.chatbotService.initializeClient();
    const conversation = await this.chatbotService.createConversation(this.userMessage, 1);
    this.conversationId = conversation.conversation_uuid;

    this.chatbotService.listenForMessages(this.conversationId, (message) => {
      this.messages.push({ text: message.payload.text, isBot: true });
    });
  }

  async sendMessage(): Promise<void> {
    if (!this.userMessage.trim()) return;
    this.messages.push({ text: this.userMessage, isBot: false });
    await this.chatbotService.sendMessage(this.conversationId, this.userMessage);
    this.userMessage = '';
  }
}
