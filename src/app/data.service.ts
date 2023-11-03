import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(selectedDatabase: string): Observable<any> {
    console.log("Inside getData")
    return this.http.get(`/connect-to-database/${selectedDatabase}`);
  }

  sendMessage(userMessage: string): Observable<any> {
    const url = '/chat'; // The endpoint to Chat with openai
    const requestBody = { message: userMessage };
    console.log(requestBody)
    console.log(this.http.post(url, requestBody))
    return this.http.post(url, requestBody);
  }
}