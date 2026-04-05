import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationRequest, AuthenticationResponse, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiUrl = 'http://localhost:8080/api/v1/auth';

  private readonly TOKEN_KEY = 'auth_token';
  isAuthenticated = signal<boolean>(this.hasToken());
  isAdmin = signal<boolean>(this.checkAdminStatus());

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, request)
      .pipe(tap(response => this.handleAuthentication(response.token)));
  }

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request)
      .pipe(tap(response => this.handleAuthentication(response.token)));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.isAuthenticated.set(false);
    this.isAdmin.set(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private handleAuthentication(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.isAuthenticated.set(true);
    this.isAdmin.set(this.checkAdminStatus());
  }

  private checkAdminStatus(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      // Temporary fix: Check by email since roles are missing in JWT
      // Also checking for standard roles if you add them later
      const isAdminEmail = payload.sub === 'anesfirih@gmail.com';

      const rawRoles = payload.role || payload.roles || payload.authorities || [];
      const rolesArray = Array.isArray(rawRoles) ? rawRoles : [rawRoles];
      const hasAdminRole = rolesArray.some((r: any) => String(r).toUpperCase().includes('ADMIN'));

      return isAdminEmail || hasAdminRole;
    } catch (e) {
      return false;
    }
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }
}
