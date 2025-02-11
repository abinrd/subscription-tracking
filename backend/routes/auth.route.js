import {Router} from 'express'

const authRouter = Router();

authRouter.get('/sign-up',(req,res)=>{
    res.send({title:"SignUp"})
})

authRouter.get('/sign-in',(req,res)=>{
    res.send({title:"SignIn"})
})

authRouter.get('/sign-out',(req,res)=>{
    res.send({title:"SignOut"})
})

export default authRouter;