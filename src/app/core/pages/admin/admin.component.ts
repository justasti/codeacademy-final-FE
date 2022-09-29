import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CurrentUser from 'src/app/shared/interfaces/CurrentUser.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  showCard: boolean = false;

  allUsers: CurrentUser[] = [];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  editUser(personalCode: string) {
    this.router.navigate(['edituser', personalCode], {
      relativeTo: this.route,
    });
    this.showCard = true;
  }
}
