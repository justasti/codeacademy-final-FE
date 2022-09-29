import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Appointment from 'src/app/shared/interfaces/Appointment.interface';
import User from 'src/app/shared/interfaces/User.interface';
import { AppointmentsService } from '../../services/appointments.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor(
    private appointmentsService: AppointmentsService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  displayedColumns: string[] = [
    'id',
    'patientName',
    'date',
    'problem',
    'doctorName',
  ];

  users: User[] = [];

  currentUser!: User;

  activeAppointments: Appointment[] = [];
  expiredAppointments: Appointment[] = [];

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .subscribe((res) => (this.currentUser = res));
    this.getAllAppointments();
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  private getAllAppointments(): void {
    this.appointmentsService
      .getAllAppointments()
      .subscribe((res: Appointment[]) => {
        for (let appointment of res) {
          const parsedAppointmentDate = Date.parse(appointment.appointmentDate);
          const parsedCurrentDate = Date.parse(new Date().toDateString());
          if (parsedAppointmentDate < parsedCurrentDate) {
            this.expiredAppointments.push(appointment);
            this.expiredAppointments = this.expiredAppointments.sort((a, b) =>
              a.appointmentDate < b.appointmentDate ? -1 : 1
            );
          } else {
            this.activeAppointments.push(appointment);
            this.activeAppointments = this.activeAppointments.sort((a, b) =>
              a.appointmentDate < b.appointmentDate ? 1 : -1
            );
          }
        }
      });
  }

  showAppointment(appointment: Appointment): boolean {
    let currentUserRole = this.authService.getRoles()[0];
    if (currentUserRole.name === 'admin') {
      return true;
    } else if (currentUserRole.name === 'doctor') {
      return appointment.doctorPersonalCode === this.currentUser.personalCode;
    } else {
      return appointment.patientPersonalCode === this.currentUser.personalCode;
    }
  }

  getUserName(personalCode: string) {
    const user: User = this.users.filter(
      (user) => user.personalCode === personalCode
    )[0];
    return `${user?.firstName || ''} ${user?.lastName || ''}`;
  }

  deleteAppointment(id: string | undefined): void {
    const index = this.activeAppointments.findIndex(
      (appointment) => appointment.id === id
    );
    this.activeAppointments.splice(index, 1);

    this.appointmentsService.deleteAppointment(id);
  }

  editApppointment(id: string | undefined) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }
}
