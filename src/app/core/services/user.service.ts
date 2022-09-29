import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import CurrentUser from 'src/app/shared/interfaces/CurrentUser.interface';
import Role from 'src/app/shared/interfaces/Role.interface';
import User from 'src/app/shared/interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private API_PATH = 'http://localhost:8080/';

  private requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  public login(loginData: { personalCode: string; password: string }) {
    return this.http.post(this.API_PATH + 'authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get<CurrentUser>(this.API_PATH + 'api/users/current');
  }

  public createUser(user: User) {
    return this.http.post(this.API_PATH + 'api/users/new', user, {
      headers: this.requestHeader,
    });
  }

  public getAllDoctors(): Observable<any> {
    return this.http.get(this.API_PATH + 'api/users/doctors');
  }

  public getAllUsers(): Observable<any> {
    return this.http.get(this.API_PATH + 'api/users/');
  }

  public getUser(personalCode: string): Observable<User> {
    return this.http.get<User>(this.API_PATH + 'users/get/' + personalCode);
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
