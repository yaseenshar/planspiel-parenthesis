import { Component } from '@angular/core';
import { ChatbotService } from '../../../services/api/botpress/chatbot.service'

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.scss'
})
export class SummaryPageComponent {
  list: any;
  
  constructor(private chatbotService: ChatbotService){
    this.refresh();
  }

  async refresh(){
    this.list = await this.chatbotService.getSummaries();
    console.log(this.list)
  }

  searchQuery = '';

  get filteredConversation() {
    if(!this.searchQuery){
      return this.list;
    }

    return this.list.filter((summary: { conversationId: string, createdAt: any, summary:string, transcript:[] }) =>
      summary.conversationId.toLowerCase().includes(this.searchQuery?.toLowerCase())
    );
  }

  downloadSummary(conv: any) {
    const blob = new Blob([this.formatText(conv.transcript)], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conv.conversationId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  formatText(transcript:any){
    let text: string = "";
    transcript.forEach((message: { sender: string; preview: any; }) => {
      text+=`${message.sender.toUpperCase()}: ${message.preview} \n`
    });

    console.log(text);
    return text;
  }
}
