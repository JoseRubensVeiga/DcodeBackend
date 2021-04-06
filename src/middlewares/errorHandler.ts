import { ErrorRequestHandler } from 'express';

import AppError from '../errors/AppError';

const errorHandler: ErrorRequestHandler = (err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default errorHandler;
