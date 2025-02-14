import {Router} from 'express'
import { signIn, signUp, signOut } from '../controller/auth.controller';

const authRouter = Router();

//Path:apii/v1/auth/sign-up-in-out(POST)
authRouter.get('/sign-up',signUp)
authRouter.get('/sign-in',signIn)
authRouter.get('/sign-out',signOut)

export default authRouter;