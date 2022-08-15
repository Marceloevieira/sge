import express from 'express';
import { currentUserRouter } from './auth/current-user';
import { signinRouter } from './auth/signin';
import { signoutRouter } from './auth/signout';
import { signupRouter } from './auth/signup';

const router = express.Router();

router.use(currentUserRouter);
router.use(signupRouter);
router.use(signinRouter);
router.use(signoutRouter);

export { router as routerV1 };
