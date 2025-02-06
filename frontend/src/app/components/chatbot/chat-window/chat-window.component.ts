import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from '../../../services/api/botpress/chatbot.service';
import { Message } from '@botpress/chat';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ConversationService } from '../../../services/api/conversation/conversation.service';
import { PdfService } from '../../../services/api/pdf/pdf.service';
import * as pdfjsLib from 'pdfjs-dist';

//pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.Worker;


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})

export class ChatWindowComponent implements OnInit {
  isStart: boolean = true;
  @ViewChild('chatWindow') private chatWindow!: ElementRef;
  @ViewChild('headerMain') private headerMain!: ElementRef;

  conversationId!: string;
  chatMessages: { message: string; isBot: boolean }[] = [];
  userMessage: string = '';

  messagesList: Message[] = [];

  private loadingSubscription!: Subscription;
  bindListener: boolean = true;
  selectedFile: File | null = null;
  loading: boolean = false;
  userID: string | null  = "";
  uploadedFileName: string = "";
  extractedText: any;

  constructor(private chatbotService: ChatbotService, 
    private route: ActivatedRoute, 
    private conversationService: ConversationService,
    private pdfService: PdfService, private router: Router
  ) { }

  ngOnInit() {
    try{
      this.loadingSubscription = this.conversationService.loading$.subscribe(state => {
        this.loading = state;
      });
      
      // Subscribe to route parameter changes
      this.route.params.subscribe(async (params) => {
        this.conversationId = params['id']; // Retrieve conversationId from the route
        console.log('Updated Conversation ID:', this.conversationId);
        this.conversationService.setLoadingState(false);
        if (!this.conversationId) return;
        await this.loadConversation(); // Call your logic to load the conversation
      });

    }
    catch(error){
      console.log(error)
      this.conversationService.setLoadingState(false);
    }
  }

  async loadConversation() {

    try{
      await this.chatbotService.initializeClient();
      
      this.messagesList = await this.chatbotService.listMessages(this.conversationId);
      this.chatWindow.nativeElement.style.display = 'block'; 
      this.headerMain.nativeElement.style.display = 'none';

      this.chatMessages = this.messagesList.map((message) => ({
        message: this.formatText(message.payload.text),
        isBot: !message.payload.options?.find((option: any) => option.label==="sentBy" && option.value==="user")
      }));
      
      this.userID = localStorage.getItem('botpressId')

      this.scrollToBottom();
      await this.bindMessageListner();
      
      this.conversationService.setLoadingState(false);
    }
    catch(error){
      console.log(error)
      this.conversationService.setLoadingState(false);
    }
    finally{
      this.conversationService.setLoadingState(false);
    }
  }

  async onFileSelected(event: any) {
    try{
      this.conversationService.setLoadingState(true);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      let base64="";
      reader.onload = () => {
        base64 = (reader.result as string).split(',')[1];
      }
      
      const payload = {
        file: file,
        customerNumber: "user_01JJPR0KEFE91PPMKQ19B3PJ44"
      };

      console.log(payload)

      this.pdfService.uploadPdf(payload).subscribe(response => {
        console.log(response)
        //alert('File uploaded successfully!');
      }, error => {
        console.error('Upload failed', error);
      });
      
      this.conversationService.setLoadingState(false);
      //alert("document uploaded");
    }
    catch(error){
      console.log("Unable to upload document. Reason: "+error);      
      this.conversationService.setLoadingState(false);
    }
    finally{
      this.conversationService.setLoadingState(false);
    }
  }

  async bindMessageListner() {
    try{
      if (!this.bindListener) return;
      
      this.conversationService.setLoadingState(true);
      if (!this.conversationId) {
        const conversation = await this.chatbotService.createConversation(this.userMessage, 1);
        this.conversationId = conversation.conversation_uuid;
      }
    
      this.chatbotService.listenForMessages(this.conversationId, (message) => {
        this.chatMessages.push({ message: this.formatText(message.payload.text), isBot: true });
        this.scrollToBottom();
      });
      this.bindListener = false;
      this.conversationService.setLoadingState(false);
    }
    catch(error){
      console.log(error);
      this.conversationService.setLoadingState(false);
    }
    finally{
      this.conversationService.setLoadingState(false);
    }
  }
  
  async sendMessage(): Promise<void> {
    try{
      if (!this.userMessage.trim()) return;
      
      this.conversationService.setLoadingState(true);
      this.chatWindow.nativeElement.style.display = 'block'; 
      this.headerMain.nativeElement.style.display = 'none'; 

      await this.bindMessageListner();

      this.chatMessages.push({ message: this.userMessage, isBot: false });
      await this.chatbotService.sendMessage(this.conversationId, this.userMessage);
      this.userMessage = '';
      this.conversationService.setLoadingState(false);
      this.scrollToBottom();
    }
    catch(error){
      this.conversationService.setLoadingState(false);
    }
    finally{
      this.conversationService.setLoadingState(false);
    }
  }

  // Scroll to the bottom of the chat container
  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    });
  }

  quickReply(message: string) {
    this.chatWindow.nativeElement.style.display = 'block'; 
    this.headerMain.nativeElement.style.marginTop = '20px'; 
    this.userMessage = message;
    this.sendMessage();
  }

  formatText(input: string) {
    try{
      return input.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
    }
    catch{
      console.log("Unable to format API response.")
      return input;
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  adjustTextareaHeight(): void {
    const textarea = document.querySelector('.chat-input-textarea') as HTMLTextAreaElement;
    if (textarea) {
        textarea.style.height = 'auto';  // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`;  // Set height based on scrollHeight
    }
  }
}
