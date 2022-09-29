import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  public deleteAppointment(id: string | undefined): Subscription {
    return this.http.delete(this.API_PATH + `${id}/delete`).subscribe();
  }
  public updateAppointment(id: number, appointment: Appointment) {
    return this.http
      .put(this.API_PATH + `${id}/update`, { id, ...appointment })
      .subscribe();
  }
}
