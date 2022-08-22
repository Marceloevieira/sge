import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../../errors/bad-request-error';
import { validateRequest } from '../../../middlewares/validate-request';
import { User } from '../../../model/user.model';

const router = express.Router();

router.put(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;

    const existingUser = await User.query().findOne({ userName: email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = await User.query().insert({
      userName: email,
      password: password,
    });

    //Generate JWT
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.userName,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    request.session = {
      jwt: userJWT,
    };

    response.status(201).send(user);
  }
);

export { router as signupRouter };
