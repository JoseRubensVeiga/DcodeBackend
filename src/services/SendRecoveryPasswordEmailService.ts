import { MailOptions } from 'nodemailer/lib/json-transport';
import { getCustomRepository } from 'typeorm';
import emailConfig from '../config/email';
import AppError from '../errors/AppError';

import UserRepository from '../repositories/UserRepository';

export default class SendRecoveryPasswordEmailService {
  public async execute(email: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return;
    }

    const code = Math.random().toString().slice(2, 7);

    user.recovery_password_code = code;

    await userRepository.save(user);

    const emailOptions: MailOptions = {
      from: 'plataforma.dcode@gmail.com',
      to: email,
      subject: 'Recuperação de senha',
      html: `
        <h1>Seu código para recuperação de senha é:</h1>
        <p style="font-size: 50px; margin-top: 0; text-align: center; letter-spacing: 30px;">${code}</p>
      `,
    };

    const emailResponse = await this.sendMail(emailOptions);

    if (!emailResponse) {
      throw new AppError('An error occurred while sending the email.', 400);
    }
  }

  private sendMail(emailOptions: MailOptions): Promise<boolean> {
    return new Promise(resolve => {
      emailConfig.sendMail(emailOptions, error => {
        resolve(!error);
      });
    });
  }
}
