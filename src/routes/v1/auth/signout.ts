import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.put(
  '/signout',
  async (request: Request, response: Response, next: NextFunction) => {
    request.session = null;

    response.send({});
  }
);

export { router as signoutRouter };
