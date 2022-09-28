import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Appointment from 'src/app/shared/interfaces/Appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  private API_PATH = 'http://localhost:8080/api/appointments/';

  public createNewAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(this.API_PATH + 'new', appointment);
  }

  public getAllAppointments(): Observable<any> {
    return this.http.get(this.API_PATH);
  }
}
