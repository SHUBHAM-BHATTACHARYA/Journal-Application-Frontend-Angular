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

  getJournalById(id:string): Observable<any>{

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

    const url = `http://localhost:8080/journalApplication/journal/getJournalByJournalId/${id}`;
    return this.http.get(url, httpOptions);

  }

  addJournal(updatedData: any): Observable<any>{
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
    const url = 'http://localhost:8080/journalApplication/journal/addJournal';
    return this.http.post(url, updatedData, httpOptions);
  }

  updateJournal(id:string, updatedData: any): Observable<any>{
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
    const url = `http://localhost:8080/journalApplication/journal/editJournalByJournalId/${id}`;
    return this.http.put(url, updatedData, httpOptions);
  }

  deleteJournal(id:string): Observable<any>{
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
    const url = `http://localhost:8080/journalApplication/journal/deleteJournalByJournalId/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
