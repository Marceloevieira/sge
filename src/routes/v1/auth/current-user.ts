import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../../model/user.model';

const router = express.Router();

router.get(
  '/current-user',
  async (request: Request, response: Response, next: NextFunction) => {
    const users = await User.query();
    response.status(200).send(users);
  }
);

export { router as currentUserRouter };
