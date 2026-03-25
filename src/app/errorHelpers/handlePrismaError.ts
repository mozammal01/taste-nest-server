import { Prisma } from '@prisma/client';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  let statusCode = 400;
  let message = 'Prisma Error';
  let errorSources: TErrorSources = [];

  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'Duplicate Entity';
    const target = err.meta?.target as string[];
    errorSources = [
      {
        path: target ? target.join(', ') : '',
        message: `Already exists.`,
      },
    ];
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Entity Not Found';
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaError;
