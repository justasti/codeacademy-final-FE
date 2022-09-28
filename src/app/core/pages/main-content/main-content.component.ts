import { Component, OnInit } from '@angular/core';
import Appointment from 'src/app/shared/interfaces/Appointment.interface';
import { AppointmentsService } from '../../services/appointments.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor(private appointmentsService: AppointmentsService) {}

  displayedColumns: string[] = ['id', 'name', 'date', 'problem'];

  appointments: Appointment[] = [];

  ngOnInit(): void {
    this.appointmentsService.getAllAppointments().subscribe((res) => {
      this.appointments = res;
    });
  }
}
