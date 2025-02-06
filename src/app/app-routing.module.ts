import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screen/login/login.component';
import { SignupComponent } from './screen/signup/signup.component';
import { HomeComponent } from './screen/home/home.component';
import { LogoutSurveyComponent } from './screen/logout-survey/logout-survey.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { VisionComponent } from './screen/vision/vision.component';
import { PublicComponent } from './screen/public/public.component';
import { Login2Component } from './screen/login2/login2.component';
import { BotPressChatbotComponent } from './components/chatbot/botpress/chatbot/chatbot.component';
import { ChatWindowComponent } from './components/chatbot/chat-window/chat-window.component';
import { ChatLayoutComponent } from './components/chatbot/chat-layout/chat-layout.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { NotFoundComponent } from './screen/not-found/not-found.component';
import { ForgotPasswordComponent } from './screen/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './screen/auth/reset-password/reset-password.component';
import { GoogleSignupComponent } from './screen/auth/google-signup/google-signup.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SummaryPageComponent } from './components/chatbot/summary-page/summary-page.component';
import { ChatbotDocumentsComponent } from './components/chatbot/chatbot-documents/chatbot-documents.component';
import { TalkToAHumanComponent } from './components/chatbot/talk-to-a-human/talk-to-a-human.component';
import { UserInsightsComponent } from './components/chatbot/user-insights/user-insights.component';



const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'login2', component: LoginComponent },
  { path: 'login', component: Login2Component },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'google-signup', component: GoogleSignupComponent },
  
  { path: 'profile', component: ProfilePageComponent }, // Add this route
  { path: 'public', component: PublicComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'logout-survey', component: LogoutSurveyComponent },
  
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'botpress-chatbot', component: BotPressChatbotComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatLayoutComponent,  canActivate: [AuthGuard], // Parent layout
    children: [
      { path: '', component: ChatWindowComponent
      },
      { path: 'documents', component: ChatbotDocumentsComponent
      },
      { path: 'userInsights', component: UserInsightsComponent
      },
      { path: 'summaries', component: SummaryPageComponent
      },
      { path: 'conversation/:id', component: ChatWindowComponent
      },
      { path: 'conversation/:id/talkToAHuman', component: TalkToAHumanComponent
      }
    ]
  },

  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
