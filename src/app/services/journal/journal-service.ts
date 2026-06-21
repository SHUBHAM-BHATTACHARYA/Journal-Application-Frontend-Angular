import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  
  constructor(
    private http:HttpClient,
    private authService: AuthService
  ){
    
  }

  getJournals(): Observable<any>{

    const token = this.authService.getAuthorizationToken();
    let httpOptions = {}

    // If token exists, append the Basic Auth string
    if(token){
      //Set up the HttpHeaders object
      httpOptions = {
        headers: new HttpHeaders().set('Authorization', token),
        withCredentials: true
      };
      
    }

    const url = "http://localhost:8080/journalApplication/journal/getJournalByUserName";
    return this.http.get(url, httpOptions);

  }
}
