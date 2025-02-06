import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConversationService } from '../../../services/api/conversation/conversation.service';

@Component({
  selector: 'app-conversation-sidebar',
  templateUrl: './conversation-sidebar.component.html',
  styleUrl: './conversation-sidebar.component.scss'
})
export class ConversationSidebarComponent {
  constructor(private conversationService: ConversationService) {}
  @Input() conversations: any[] = [];
  @Input() activeConversationId: string | null = null;
  @Output() conversationSelected = new EventEmitter<string>();
  @Output() menuSelected = new EventEmitter<string>();

  showInteractions: boolean = false;
  activeMenu: string = "previous_interaction";

  selectConversation(id: string): void {
    this.conversationService.setLoadingState(true);
    this.conversationSelected.emit(id);
    this.activeConversationId = id;
  }

  toggleInteractions() {
    this.showInteractions = !this.showInteractions;
  }

  setActive(menu: string){
    this.showInteractions = false;
    this.activeMenu = menu;

    if(menu === "previous_interactions"){
      this.toggleInteractions();
    }
    else{
      this.showInteractions = false;
    }

    
    this.menuSelected.emit(menu);
  }  
}
