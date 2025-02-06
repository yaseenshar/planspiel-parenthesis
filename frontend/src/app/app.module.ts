import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';  // Imported the MatExpansionModule

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { BotPressChatbotComponent } from './components/chatbot/botpress/chatbot/chatbot.component';
import { LoginComponent } from './screen/login/login.component';
import { SignupComponent } from './screen/signup/signup.component';
import { HomeComponent } from './screen/home/home.component';
import { LogoutSurveyComponent } from './screen/logout-survey/logout-survey.component';
import { VisionComponent } from './screen/vision/vision.component';
import { PublicComponent } from './screen/public/public.component';
import { Login2Component } from './screen/login2/login2.component';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChatWindowComponent } from './components/chatbot/chat-window/chat-window.component'; // Ensure your component is imported
import { ChatLayoutComponent } from './components/chatbot/chat-layout/chat-layout.component';
import { ConversationSidebarComponent } from './components/chatbot/conversation-sidebar/conversation-sidebar.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthService } from './services/api/authentication/auth.service';
import { ChatbotService } from './services/api/botpress/chatbot.service';
import { HeaderComponent } from './screen/header/header.component';
import { NotFoundComponent } from './screen/not-found/not-found.component';
import { ForgotPasswordComponent } from './screen/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './screen/auth/reset-password/reset-password.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ChatbotDocumentsComponent } from './components/chatbot/chatbot-documents/chatbot-documents.component';
import { TalkToAHumanComponent } from './components/chatbot/talk-to-a-human/talk-to-a-human.component';
import { UserInsightsComponent } from './components/chatbot/user-insights/user-insights.component';
import { SummaryPageComponent } from './components/chatbot/summary-page/summary-page.component';




@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    VisionComponent,
    LogoutSurveyComponent,
    PublicComponent,
    Login2Component,
    BotPressChatbotComponent,
    ChatWindowComponent,
    ConversationSidebarComponent,
    ChatLayoutComponent,
    HeaderComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfilePageComponent,
    SummaryPageComponent,
    ChatbotDocumentsComponent,
    TalkToAHumanComponent,
    UserInsightsComponent
  ],
  imports: [
    BaseChartDirective,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MdbFormsModule, ReactiveFormsModule,MdbCheckboxModule,
    MatExpansionModule,
    HttpClientModule,

  ],
  providers: [
    AuthGuard, AuthService, ChatbotService
//    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
