import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotDocumentsComponent } from './chatbot-documents.component';

describe('ChatbotDocumentsComponent', () => {
  let component: ChatbotDocumentsComponent;
  let fixture: ComponentFixture<ChatbotDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbotDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
