import { Injectable } from '@angular/core';
import Role from 'src/app/shared/interfaces/Role.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public setRoles(roles: Role[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): Role[] {
    return JSON.parse(localStorage.getItem('roles') || '{}');
  }

  public setToken(token: string): void {
    localStorage.setItem('jwtToken', JSON.stringify(token));
  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem('jwtToken') || '{}');
  }

  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return (
      this.getRoles().length !== 0 &&
      JSON.stringify(this.getToken()) !== JSON.stringify({})
    );
  }
}
