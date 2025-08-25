import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; senha: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(tap(response => localStorage.setItem('token', response.token)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
