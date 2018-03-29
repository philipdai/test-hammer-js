import { User } from '../../auth/user.model';

export class Wedding {
  id: string;
  active: boolean;
  name: string;
  ownerId: string;
  users: User[];
  usersSetDefault: User[];
}
