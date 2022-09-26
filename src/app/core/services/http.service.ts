import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../pages/main-content/main-content.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAppointments: Observable<Appointment[]> = this.http.get<Appointment[]>(
    'http://localhost:8080/api/appointments'
  );

  addAppointment(appointment: Appointment) {
    this.http
      .post('http://localhost:8080/api/appointments', appointment)
      .subscribe();
  }
}
