import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import UserRepository from '../repositories/UserRepository';

interface Request {
  email: string;
  recovery_password_code: string;
}

export default class VerifyRecoveryPasswordCodeService {
  public async execute({
    email,
    recovery_password_code,
  }: Request): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: {
        email,
        recovery_password_code: recovery_password_code,
      },
    });

    if (!user) {
      throw new AppError("The Recovery Password isn' correct.");
    }

    return;
  }
}
