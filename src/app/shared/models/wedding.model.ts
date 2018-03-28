import { User } from '../../auth/user.model';

export class Wedding {
  active: boolean;
  isDefault: boolean;
  name: string;
  ownerId: string;
  users: User[]
}
