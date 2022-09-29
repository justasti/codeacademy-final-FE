import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { NewAppointmentComponent } from './core/components/new-appointment/new-appointment.component';
import { AdminComponent } from './core/pages/admin/admin.component';
import { MainContentComponent } from './core/pages/main-content/main-content.component';

const routes: Routes = [
  {
    path: 'appointments',
    component: MainContentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'appointments/new', component: NewAppointmentComponent },
  { path: 'appointments/:id/edit', component: NewAppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
