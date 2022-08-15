import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.put(
  '/signup',
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send('Teste book route');
  }
);

export { router as signupRouter };
