import { getCustomRepository } from 'typeorm';
import VerifyRecoveryPasswordCodeService from './VerifyRecoveryPasswordCodeService';
import UserRepository from '../repositories/UserRepository';
import AppError from '../errors/AppError';
import { hash } from 'bcryptjs';

interface Request {
  email: string;
  recovery_password_code: string;
  password: string;
}

export default class RecoveryPasswordService {
  public async execute(request: Request): Promise<void> {
    const verifyRecoveryPasswordCode = new VerifyRecoveryPasswordCodeService();

    await verifyRecoveryPasswordCode.execute({
      email: request.email,
      recovery_password_code: request.recovery_password_code,
    });

    const userRepository = getCustomRepository(UserRepository);

    this.validPassword(request.password);

    const user = await userRepository.findOne({
      where: { email: request.email },
    });

    if (!user) {
      return;
    }

    const hashedPassword = await hash(request.password, 8);

    user.password = hashedPassword;
    user.recovery_password_code = undefined;

    await userRepository.save(user);
  }

  private validPassword(password: string): void {
    const { length } = password;

    if (length < 8) {
      throw new AppError(
        'The password length must be greater than 7 characters.',
      );
    }
  }
}
