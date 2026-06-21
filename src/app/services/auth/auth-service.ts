import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
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

  // Create a writable signal to syncup the value, ensures that any component displaying the username updates instantly when the user logs in or out
  currentUsername = signal<string | null>('');

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
        this.currentUsername.set(username);
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
    this.currentUsername.set(null);
  }

}
