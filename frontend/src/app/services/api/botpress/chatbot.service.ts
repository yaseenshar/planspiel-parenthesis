import { Injectable } from '@angular/core';
import * as chat from '@botpress/chat';
import { environment } from '../../../../environments/environment';
import { Guid } from "guid-typescript";
import { Client } from '@botpress/client';
import { Conversation, ConversationService } from '../conversation/conversation.service';
import { AuthService } from '../authentication/auth.service';
import { lastValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChatbotService {

  private client!: chat.AuthenticatedClient;
  private listener!: chat.SignalListener;
  private isReconnecting = false;
  private adminClient!: Client;

  private readonly apiUrl = `${environment.botpressApiUrl}${environment.webhookId}`;
  
  constructor(private conversationService: ConversationService, private authService: AuthService) { 
    this.adminClient = new Client({
      token: 'bp_pat_8pi0v2SALw4VewhHQQVyVrXm0ZVqjGurpi48',
      botId: '27d9d2e2-7307-4907-8b02-4d50979482c8',
      workspaceId: 'wkspace_01JH8ASDZGKJ877B8BATBMYBGT'
    });
  }

  async initializeClient(): Promise<void> {    
    const userKey = localStorage.getItem('botpressToken') || '';
    const userId = localStorage.getItem('botpressId') || '';
    this.client = await chat.Client.connect({ apiUrl: this.apiUrl, userKey, userId });
  }

  async getSummaries(): Promise<any> {
    const { rows } = await this.adminClient.findTableRows({
      table: 'Int_Connor_Conversations_Table',
      orderBy: 'created_at',
      orderDirection: 'desc'
    });

    return rows;
  }

  async createUser(name: string): Promise<any> {
    try {
      this.client = await chat.Client.connect({ apiUrl: this.apiUrl });
      await this.client.updateUser({ name: name, pictureUrl: '', profile: '' });
    }
    catch (error) {
      console.error('Failed to retrieve user:', error);
    }

    return this.client.user;
  }

  async getUser(userKey: string, userId: string): Promise<any> {
    const getUserInput = {
      "x-user-key": this.client.user.key,
    };
    try {
      const getUser = await this.client.getUser(getUserInput);
      return getUser;
    } catch (error) {
      console.error('Failed to retrieve user:', error);
    }

    return null;
  }

  async createConversation(userMessage: string, conversationType: number): Promise<any> { 
    
    const conversation_id = Guid.create();
    const userKey = localStorage.getItem('botpressToken') || '';
    const userId = localStorage.getItem('botpressId') || '';
    
    this.client = await chat.Client.connect({ apiUrl: this.apiUrl, userKey, userId });
    const { conversation } = await this.client.createConversation({ });
    const conversationReq = this.conversationService.createConversation({
      conversation_uuid: conversation.id,
      conversation_heading: userMessage.length > 250 ? userMessage.substring(0, 250) : userMessage,
      type: conversationType,
      user_id: await this.authService.getLoggedInUser()
    });
    
    const newConversation = await lastValueFrom(conversationReq);
    console.log(newConversation); // Use the response here

    return newConversation;
  }

  async sendMessage(conversationId: string, text: string): Promise<void> {
    await this.client.createMessage({
      conversationId,
      payload: { type: 'text', options:[{"label":"sentBy", "value":"user"}], text },
    });
  }

  async listMessages(conversationId: string): Promise<chat.Message[]> {
    const { messages } = await this.client.listMessages({ conversationId });
    console.log(messages)
    return messages.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async listenForMessages(
    conversationId: string,
    onMessage: (message: chat.Message) => void
  ): Promise<void> {
    this.listener = await this.client.listenConversation({ id: conversationId });

    this.listener.on('message_created', (event: any) => {
      if (event.userId !== this.client.user.id) {
        onMessage(event);
      }
    });

    // Handle disconnections
    this.listener.on('error', (err) => {
      console.error('Connection lost:', err);
      this.handleReconnection(conversationId, onMessage);
    });
  }

  private async handleReconnection(
    conversationId: string,
    onMessage: (message: chat.Message) => void
  ): Promise<void> {
    if (this.isReconnecting) return; // Avoid multiple reconnection attempts
    this.isReconnecting = true;

    try {
      console.log('Attempting to reconnect...');
      await this.listener.connect(); // Reconnect listener
      const { messages } = await this.client.listMessages({ conversationId });
      console.log('Reconnection successful, messages restored:', messages);

      // Resume listening for messages
      await this.listenForMessages(conversationId, onMessage);
    } catch (error) {
      console.error('Failed to reconnect, retrying...', error);
      setTimeout(() => this.handleReconnection(conversationId, onMessage), 1000); // Retry with backoff
    } finally {
      this.isReconnecting = false;
    }
  }

  async listConversations(): Promise<any[]> {
    let { conversations } = await this.client.listConversations({});
    let _conversations2: any[] = [];
    let _conversations: any[] = [];

    const userConversationReq = this.conversationService.getConversationsByUserId(this.authService.getLoggedInUser());
    
    const userConversations = await lastValueFrom(userConversationReq);
    
    
    // Ensure userConversation is an array
    if (Array.isArray(conversations)) {
      _conversations2 = userConversations.filter(userConv => 
        conversations.some(conv => conv.id ===  userConv.conversation_uuid )
      );


    }
    
    for (const node of conversations) {
      const displayName = this.createDisplayName(node.id);
      if (displayName)
        _conversations.push({
          ...node,
          displayName
        })
    }
    return _conversations2;
  }

  createDisplayName(id: string)
  {
    const parts = id.split('_');
    if(parts.length > 1){
      parts.pop();
    }
    return parts.join(' ');
  }
}
