import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  message: string = '';

  closeMessage: string = '';

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    this.translate
      .get('common.close')
      .subscribe((res) => (this.closeMessage = res));
  }

  checkErrors(field: string, error: string) {
    return (
      this.loginForm.get(field)?.touched &&
      this.loginForm.get(field)?.hasError(error)
    );
  }

  onSubmitForm(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.translate
        .get('login.welcome')
        .subscribe((res) => (this.message = res));
      this.snackBar.open(this.message, this.closeMessage, {
        duration: 1000,
        verticalPosition: 'top',
      });
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } else {
      this.translate
        .get('login.invalid')
        .subscribe((res) => (this.message = res));
      this.snackBar.open(this.message, this.closeMessage, {
        verticalPosition: 'top',
      });
    }
  }
}
