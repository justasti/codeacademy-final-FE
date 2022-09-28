import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  message: string = '';

  closeMessage: string = '';

  signupForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      personalCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [
        Validators.required,
        this.checkPasswordMatch(),
      ]),
    });

    this.translate
      .get('common.close')
      .subscribe((res) => (this.closeMessage = res));
  }

  checkErrors(field: string, error: string) {
    return (
      this.signupForm.get(field)?.touched &&
      this.signupForm.get(field)?.hasError(error)
    );
  }

  onSubmitForm(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      this.userService
        .createUser({
          personalCode: this.signupForm.get('personalCode')?.value,
          email: this.signupForm.get('email')?.value,
          firstName: this.signupForm.get('firstName')?.value,
          lastName: this.signupForm.get('lastName')?.value,
          password: this.signupForm.get('password')?.value,
        })
        .subscribe(
          (res) => {
            this.translate
              .get('signup.success')
              .subscribe((res) => (this.message = res));
            this.snackBar.open(this.message, this.closeMessage, {
              duration: 1000,
              verticalPosition: 'top',
            });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          },
          (err) => {
            console.log('err: ', err);
          }
        );
    }
  }

  checkPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.signupForm.value.password === control.value
        ? null
        : { noMatch: true };
    };
  }
}
