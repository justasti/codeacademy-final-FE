import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Role from '../../interfaces/Role.interface';
import User from '../../interfaces/User.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public userService: UserService
  ) {}

  defaultLang: string = this.getLangCookie() || 'en';

  langCookie!: string;

  currentUser!: User;

  currentUserRole!: string;

  public logOut(): void {
    this.authService.clear();
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  public redirect(redirectRoute: string) {
    this.router.navigate([redirectRoute]);
  }

  public onLangChange(e: MatSelectChange): void {
    this.translate.use(e.value);
    document.cookie = `lang=${e.value}`;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: e.value },
    });
  }

  private getLangCookie(): string {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.includes('lang')) {
        this.langCookie = cookie.split('=')[1];
      }
    }
    return this.langCookie;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      if (data['lang'] !== undefined) {
        this.translate.setDefaultLang(data['lang']);
      } else {
        this.translate.setDefaultLang(this.defaultLang);
      }
      if (this.isAuthenticated()) {
        this.currentUserRole = this.authService.getRoles()[0].name;
      }
    });

    this.userService
      .getCurrentUser()
      .subscribe((res) => (this.currentUser = res));
  }
}
