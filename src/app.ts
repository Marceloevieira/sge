import cookieSession from 'cookie-session';
import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { routerV1 } from './routes/v1';

const app: Application = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV == 'production',
  })
);

app.use('/v1', routerV1);

app.all(
  '*',
  async (request: Request, response: Response, next: NextFunction) => {
    next(new NotFoundError());
  }
);

app.use(errorHandler);

export { app };
