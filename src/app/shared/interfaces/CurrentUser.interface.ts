import Role from './Role.interface';

export default interface CurrentUser {
  personalCode: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: Role[];
}
