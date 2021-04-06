import User from '../models/User';
import { EntityRepository, Repository } from 'typeorm';
import { SimplifiedUser } from '../models/SimplifiedUser';

@EntityRepository(User)
export default class AppointmentsRepository extends Repository<User> {
  public async getAll(): Promise<SimplifiedUser[] | null> {
    const users = await this.find();

    if (!users) {
      return null;
    }

    return users.map(this.simplifyUser.bind(this));
  }
  public async getSimplifiedUser(
    user_id: string,
  ): Promise<SimplifiedUser | null> {
    const user = await this.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return null;
    }

    return this.simplifyUser(user);
  }

  private simplifyUser(user: User): SimplifiedUser {
    return new SimplifiedUser({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  }
}
