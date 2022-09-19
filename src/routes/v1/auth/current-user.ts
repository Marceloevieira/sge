import express, { Request, Response, NextFunction } from 'express';
import { currentUser } from '../../../middlewares/current-user';

const router = express.Router();

router.get(
  '/current-user',
  currentUser,
  async (request: Request, response: Response, next: NextFunction) => {
    response.send({ currentUser: request.currentUser || null });
  }
);

export { router as currentUserRouter };
