import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  displayedColumns: string[] = ['id', 'name', 'date', 'problem'];

  appointments: Appointment[] = [];

  ngOnInit(): void {
    this.httpService.getAppointments.subscribe(
      (res) => (this.appointments = res)
    );
  }
}
export interface Appointment {
  id: number;
  doctorPersonalCode: string;
  patientpersonalCode: string;
  appointmentDate: string;
  description: string;
}
