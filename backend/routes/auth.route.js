import {Router} from 'express'
import { signIn, signUp, signOut } from '../controller/auth.controller.js';

const authRouter = Router();

//Path:apii/v1/auth/sign-up-in-out(POST)
authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',signOut)

export default authRouter;