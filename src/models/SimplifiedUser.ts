import User from './User';

export class SimplifiedUser {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;

  constructor(data: Partial<User>) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
  }
}
