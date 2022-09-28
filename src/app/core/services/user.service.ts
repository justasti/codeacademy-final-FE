import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import Role from 'src/app/shared/interfaces/Role.interface';
import User from 'src/app/shared/interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private API_PATH = 'http://localhost:8080/';

  private requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  public login(loginData: any) {
    return this.http.post(this.API_PATH + 'authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public createUser(user: User) {
    return this.http.post(this.API_PATH + 'api/users/new', user, {
      headers: this.requestHeader,
    });
  }

  public isAuthorized(allowedRoles: string[]): boolean {
    let authorized = false;
    const userRoles: Role[] = this.authService.getRoles();

    if (userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j]) {
            authorized = true;
          }
        }
      }
    }
    return authorized;
  }
}
