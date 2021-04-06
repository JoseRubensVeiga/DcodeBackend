import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';
import RecoveryPasswordService from '../services/RecoveryPasswordService';
import SendRecoveryPasswordEmailService from '../services/SendRecoveryPasswordEmailService';
import VerifyRecoveryPasswordCodeService from '../services/VerifyRecoveryPasswordCodeService';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

routes.post('/sendRecoveryPasswordEmail', async (request, response) => {
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({
      message: 'Please, provide a valid email address',
    });
  }

  const sendRecoveryPasswordEmail = new SendRecoveryPasswordEmailService();

  await sendRecoveryPasswordEmail.execute(email);

  return response.json({
    message: 'if there is a user with that email, we sent it successfully',
  });
});

routes.post('/verifyRecoveryPasswordCode', async (request, response) => {
  const { email, recovery_password_code } = request.body;

  if (!email) {
    return response.status(400).json({
      message: 'Please, provide a valid email address',
    });
  }

  if (!recovery_password_code) {
    return response.status(400).json({
      message: 'Please, provide a recovery password code',
    });
  }

  const verifyRecoveryPasswordCode = new VerifyRecoveryPasswordCodeService();

  await verifyRecoveryPasswordCode.execute({
    email,
    recovery_password_code,
  });

  return response.json({
    message: 'The recovery password code is correct.',
  });
});

routes.post('/recoveryPassword', async (request, response) => {
  const { email, recovery_password_code, password } = request.body;

  if (!email) {
    return response.status(400).json({
      message: 'Please, provide a valid email address',
    });
  }

  if (!recovery_password_code) {
    return response.status(400).json({
      message: 'Please, provide a recovery password code',
    });
  }

  if (!password) {
    return response.status(400).json({
      message: 'Please, provide a password',
    });
  }

  const recoveryPassword = new RecoveryPasswordService();

  await recoveryPassword.execute({
    email,
    recovery_password_code,
    password,
  });

  return response.json({
    message: 'The recovery password was recovered successfully.',
  });
});

export default routes;
