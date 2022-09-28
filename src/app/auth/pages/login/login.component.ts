import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private authService: AuthService
  ) {}

  message: string = '';

  closeMessage: string = '';

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      personalCode: new FormControl('', [Validators.required]),
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
      this.userService.login(this.loginForm.value).subscribe(
        (res: any) => {
          this.authService.setToken(res.jwtToken);
          this.authService.setRoles(res.user.roles);

          this.router.navigate(['/appointments']);
        },
        (err) => {
          this.translate
            .get('login.invalid')
            .subscribe((res) => (this.message = res));
          this.snackBar.open(this.message, this.closeMessage, {
            verticalPosition: 'top',
            duration: 2000,
          });
        }
      );
    }
  }
}
