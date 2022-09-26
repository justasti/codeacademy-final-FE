import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
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
}
