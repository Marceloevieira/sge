import express, { Application, Request, Response, NextFunction } from 'express';
import { routerV1 } from './routes/v1';

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routerV1);
