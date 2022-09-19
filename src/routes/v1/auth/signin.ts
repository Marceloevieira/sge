import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../../errors/bad-request-error';
import { validateRequest } from '../../../middlewares/validate-request';
import { User } from '../../../model/user.model';
import { Password } from '../../../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must suppy a password'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;

    const existingUser = await User.query().findOne({ userName: email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    //Generate JWT
    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.userName,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    request.session = {
      jwt: userJWT,
    };

    response.status(200).send(existingUser);
  }
);

export { router as signinRouter };
