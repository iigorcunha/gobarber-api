import 'reflect-metadata';

import express, {
  Request,
  Response,
  NextFunction,
} from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '@shared/infra/errors/AppError';
import uploadConfig from '@config/upload';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(routes);
app.use(
  (
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction
  ) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log('🚀🚀🚀 Server is running on port 3333! ');
});
