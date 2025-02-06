// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly apiUrl = environment.apiURL;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials: any): Observable<any> {    
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map((response) => {
        console.log('Login response:', response); // Log the entire response
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('botpressToken', response.botpressToken);
          localStorage.setItem('botpressId', response.botpressId);
          localStorage.setItem('userId', response.userId); // Save userId here
          this.currentUserSubject.next(response.token);
        }
        return response;
      })
    );
  }

  signup(user: { firstName: string; lastName: string; email: string; password: string; botpressId: string; botpressToken: string; subscription: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  checkLoginStatus() {
    const auth = localStorage.getItem('authToken');
    const bt = localStorage.getItem('botpressToken');
    const bid = localStorage.getItem('botpressId');
    return !!(auth && bt && bid);
    //return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('botpressId');
    localStorage.removeItem('botpressToken');
    localStorage.removeItem('userId');
    this.currentUserSubject.next(null);
  }

  forgotPassword(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, credentials);
  }

  resetPassword(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const expiry = this.getTokenExpiry(token);
    return expiry ? Date.now() < expiry : false;
  }

  getTokenExpiry(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }

  getUserProfile(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    console.log('Retrieved userId:', userId); // This will show the userId in the console
  
    if (userId) {
      return this.http.get<any>(`${this.apiUrl}/auth/users/${userId}`);
    }
    return of(null); // Handle case where userId is not present
  }

  getLoggedInUser(): number {
    
    const userId = localStorage.getItem('userId');
    if (!userId) return 0;
    
    return parseInt(userId, 10);
  }
}
