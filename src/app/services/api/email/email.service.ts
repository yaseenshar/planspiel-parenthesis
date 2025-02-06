import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  sendEmail(subject: string, message: string) {
    throw new Error("Not Implemented");
  }

  
  escalateToAdmin(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/email/escalateQueryToAdmin`, body);
  }
}
