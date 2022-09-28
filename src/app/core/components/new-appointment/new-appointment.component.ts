import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  appointmentHours: number[] = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  appointmentMinutes: number[] = [
    0o0, 0o5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
  ];
  doctors: UserWithRole[] = [];

  loggedInUserPersonalCode: string = '1';

  newAppointmentForm: FormGroup = new FormGroup({});

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

    this.userService
      .getCurrentUser()
      .subscribe((res) =>
        this.newAppointmentForm
          .get('patientPersonalCode')
          ?.setValue(res.personalCode)
      );

    this.userService.getAllDoctors().subscribe((res) => (this.doctors = res));
  }

  setSelectedDoctor(event: MatSelectChange) {
    this.newAppointmentForm.get('doctorPersonalCode')?.setValue(event.value);
  }

  setSelectedHour(event: MatSelectChange) {
    this.newAppointmentForm.get('appointmentHour')?.setValue(event.value);
  }

  setSelectedMinute(event: MatSelectChange) {
    this.newAppointmentForm.get('appointmentMinute')?.setValue(event.value);
  }

  onSubmit() {
    const enteredDate = new Date(
      this.newAppointmentForm.get('appointmentDay')?.value
    );
    let [year, month, day] = [
      enteredDate.getFullYear().toString(),
      enteredDate.getMonth().toString(),
      enteredDate.getDay().toString(),
    ];

    const formToPost = {
      doctorPersonalCode:
        this.newAppointmentForm.get('doctorPersonalCode')?.value,
      patientPersonalCode: this.newAppointmentForm.get('patientPersonalCode')
        ?.value,
      appointmentDate: `${year}-${month.length === 1 ? `0${month}` : month}-${
        day.length === 1 ? `0${day}` : day
      } ${this.newAppointmentForm.get('appointmentHour')?.value}:${
        this.newAppointmentForm.get('appointmentMinute')?.value
      }`,
      description: this.newAppointmentForm.get('complaint')?.value,
      status: 'active',
    };
    if (this.newAppointmentForm.valid) {
      this.appointmentService.createNewAppointment(formToPost).subscribe();
      this.router.navigate(['/appointments']);
    }
  }
}
