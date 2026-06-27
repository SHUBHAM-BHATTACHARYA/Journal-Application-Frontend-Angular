import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  constructor(
    private http: HttpClient
  ){

  }

  addUser(userData: any): Observable<any>{
    const url = 'http://localhost:8080/journalApplication/public/addUser';
    return this.http.post(url, userData);
  }

  resetPassword(username: string, data: any): Observable<any>{
    const url = `http://localhost:8080/journalApplication/public/resetUserPassword/${username}`;
    return this.http.put(url, data);
  }
}
