import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  defaultLang: string = this.getLangCookie() || 'en';

  langCookie!: string;

  redirect(redirectRoute: string) {
    this.router.navigate([redirectRoute]);
  }

  onLangChange(e: MatSelectChange): void {
    this.translate.use(e.value);
    document.cookie = `lang=${e.value}`;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: e.value },
    });
  }

  getLangCookie(): string {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.includes('lang')) {
        this.langCookie = cookie.substring(6);
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
    });
  }
}
