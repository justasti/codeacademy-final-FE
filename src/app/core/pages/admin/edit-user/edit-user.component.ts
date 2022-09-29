import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import CurrentUser from 'src/app/shared/interfaces/CurrentUser.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  userName: string = '';

  newRole: string | undefined = undefined;

  userPC!: string;

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.userPC = res['id'];
      this.getUserName(res['id']);
    });
  }

  private getUserName(id: string) {
    this.userService.getAllUsers().subscribe((res: CurrentUser[]) => {
      let user = res.filter((user) => user.personalCode === id)[0];
      this.userName = `${user.firstName} ${user.lastName}`;
    });
  }

  onRadioChange(event: MatRadioChange) {
    this.newRole = event.value;
  }

  changeUserRole() {
    if (this.newRole) {
      this.userService.changeRole(this.userPC, this.newRole);
      this.router.navigate(['/admin']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    }
  }
}
