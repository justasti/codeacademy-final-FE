import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
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

  displayedColumns: string[] = ['id', 'name', 'date', 'problem'];

  patients: any[] = [
    {
      id: 1,
      name: 'Vardenis Pavardenis',
      date: '2022-09-21 19:00',
      description: 'Skauda koja',
    },
    {
      id: 2,
      name: 'Jonas Jonaitis',
      date: '2022-09-21 19:15',
      description: 'Skauda ranka',
    },
    {
      id: 3,
      name: 'Petras Petraitis',
      date: '2022-09-21 19:00',
      description: 'Skauda galva',
    },
    {
      id: 4,
      name: 'Stasys Stasaitis',
      date: '2022-09-21 19:00',
      description: 'Neina uzmigti',
    },
    {
      id: 5,
      name: 'Vardis Pavardis',
      date: '2022-09-21 19:00',
      description: 'Kraujuoja ausis',
    },
  ];

  onLangChange(e: MatSelectChange): void {
    this.translate.use(e.value);
    document.cookie = `lang=${e.value}`;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lang: e.value },
    });
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
