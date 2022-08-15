import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.put(
  '/signout',
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send('Teste book route');
  }
);

export { router as signoutRouter };
