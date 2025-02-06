import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject, catchError, throwError } from 'rxjs';


export interface Conversation {
  conversation_id?: number;
  conversation_uuid: string;
  conversation_heading: string;
  type: number;
  user_id: number;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConversationService {


  private apiUrl = 'http://localhost:3000/conversations';

  constructor(private http: HttpClient) { }

  createConversation(conversation: Conversation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, conversation).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error creating conversation:', error);
        return throwError(error);
      })

    );
  }


  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }

  getConversationById(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${id}`);
  }
  
  getConversationsByUserId(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/user/${userId}`);
  }

  private loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  setLoadingState(state: boolean) {
    this.loading.next(state);
  }
}
