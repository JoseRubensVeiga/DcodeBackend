import { getCustomRepository } from 'typeorm';
import { SimplifiedUser } from '../models/SimplifiedUser';

import UserRepository from '../repositories/UserRepository';

export default class ListUsersService {
  public async execute(): Promise<SimplifiedUser[] | null> {
    const usersRepository = getCustomRepository(UserRepository);

    return await usersRepository.getAll();
  }
}
