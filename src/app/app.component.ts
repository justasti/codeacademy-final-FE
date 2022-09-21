import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  defaultLang: string = this.getLangCookie() || 'en';

  onLangChange(lang: string): void {
    this.translate.use(lang);
    document.cookie = `lang=${lang}`;
    this.router.navigate([], { relativeTo: this.route, queryParams: { lang } });
  }

  getLangCookie(): string | undefined {
    const cookies = document.cookie.split(';');
    let langCookie;
    for (let cookie of cookies) {
      if (cookie.includes('lang')) {
        langCookie = cookie.substring(5);
      }
    }
    return langCookie;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => data);
    this.translate.setDefaultLang(this.defaultLang);
  }
}
