import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor(private userService: UserService) {}

  displayedColumns: string[] = ['id', 'name', 'date', 'problem'];

  appointments: Appointment[] = [];

  ngOnInit(): void {}
}
export interface Appointment {
  id: number;
  doctorPersonalCode: string;
  patientpersonalCode: string;
  appointmentDate: string;
  description: string;
}
