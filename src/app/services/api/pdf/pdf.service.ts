import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  uploadPdf(body: any): Observable<any> {
    console.log("Sending req")
    return this.http.post(`${this.apiUrl}/uploads/uploadAndExtract`, body);
  };  
}

