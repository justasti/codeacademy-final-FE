import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import Appointment from 'src/app/shared/interfaces/Appointment.interface';
import CurrentUser from 'src/app/shared/interfaces/CurrentUser.interface';
import UserWithRole from 'src/app/shared/interfaces/UserWithRole.interface';
import { AppointmentsService } from '../../services/appointments.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  constructor(
    public userService: UserService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  appointmentHours: string[] = [
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
  ];
  appointmentMinutes: string[] = [
    '00',
    '05',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ];
  doctors: UserWithRole[] = [];

  loggedInUserPersonalCode: string = '1';

  newAppointmentForm: FormGroup = new FormGroup({});

  editMode: boolean = false;

  editedAppId!: number;

  editedApp!: Appointment;

  ngOnInit(): void {
    this.newAppointmentForm = new FormGroup({
      patientPersonalCode: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      doctorPersonalCode: new FormControl(null, [Validators.required]),
      appointmentDay: new FormControl(null, [Validators.required]),
      appointmentHour: new FormControl(null, [Validators.required]),
      appointmentMinute: new FormControl(null, [Validators.required]),
      complaint: new FormControl(null, [Validators.required]),
    });

    this.userService.getAllDoctors().subscribe((res) => (this.doctors = res));
    this.fillFormIfEditing();

    if (!this.editMode) {
      this.userService
        .getCurrentUser()
        .subscribe((res) =>
          this.newAppointmentForm
            .get('patientPersonalCode')
            ?.setValue(res.personalCode)
        );
    }
  }

  private fillFormIfEditing() {
    if (this.route.snapshot.params['id']) {
      this.editMode = true;
      this.editedAppId = this.route.snapshot.params['id'];
      this.appointmentService.getAllAppointments().subscribe((res) => {
        this.editedApp = res.filter(
          (app: Appointment) =>
            app.id?.toString() === this.editedAppId?.toString()
        )[0];
        this.newAppointmentForm
          .get('patientPersonalCode')
          ?.setValue(this.editedApp.patientPersonalCode);
        this.newAppointmentForm
          .get('complaint')
          ?.setValue(this.editedApp.description);
      });
    }
  }

  public setSelectedDoctor(event: MatSelectChange) {
    this.newAppointmentForm.get('doctorPersonalCode')?.setValue(event.value);
  }

  public setSelectedHour(event: MatSelectChange) {
    this.newAppointmentForm.get('appointmentHour')?.setValue(event.value);
  }

  public setSelectedMinute(event: MatSelectChange) {
    this.newAppointmentForm.get('appointmentMinute')?.setValue(event.value);
  }

  public onSubmit() {
    const enteredDate = new Date(
      this.newAppointmentForm.get('appointmentDay')?.value
    )
      .toLocaleString('lt-LT')
      .slice(0, 10);
    const formToPost = {
      doctorPersonalCode:
        this.newAppointmentForm.get('doctorPersonalCode')?.value,
      patientPersonalCode: this.newAppointmentForm.get('patientPersonalCode')
        ?.value,
      appointmentDate: `${enteredDate} ${
        this.newAppointmentForm.get('appointmentHour')?.value
      }:${this.newAppointmentForm.get('appointmentMinute')?.value}`,
      description: this.newAppointmentForm.get('complaint')?.value,
      status: 'active',
    };
    if (this.newAppointmentForm.valid) {
      if (!this.editMode) {
        this.appointmentService.createNewAppointment(formToPost).subscribe();
      } else {
        this.appointmentService.updateAppointment(this.editedAppId, formToPost);
      }
      this.router.navigate(['/appointments']);
    }
  }
}
