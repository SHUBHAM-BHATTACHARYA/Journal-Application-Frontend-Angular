import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ){

  }

  private authHeaderKey = 'auth_token';

  login(username: string, password:string): Observable<any> {
    console.log(username);
    console.log(password);

    // Basic auth format: Basic Base64(username:password)
    const token = 'Basic ' + btoa(`${username}:${password}`);

    const url = "http://localhost:8080/journalApplication/user/authenticateUser";

    const httpOptions = {
      headers: new HttpHeaders().set('Authorization', token),
      withCredentials: true
    };

    return this.http.get(url, httpOptions).pipe(
      tap(()=>{
        // Safe token storage for app lifecycle persistence
        sessionStorage.setItem(this.authHeaderKey, token);
      })
    )
  }

  getAuthorizationToken(): string | null {
    return sessionStorage.getItem(this.authHeaderKey);
  }

  isLoggedIn(): boolean {
    return this.getAuthorizationToken() !== null;
  }

  logout() {
    sessionStorage.removeItem(this.authHeaderKey);
  }

}
