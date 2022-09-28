import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  constructor(private userService: UserService) {}

  newAppointmentForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.newAppointmentForm = new FormGroup({
      patientPersonalCode: new FormControl(null, [Validators.required]),
      doctorPersonalCode: new FormControl(null, [Validators.required]),
      appointmentDate: new FormControl(new Date(), [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {}
}
