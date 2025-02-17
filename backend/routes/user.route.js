import{Router}from 'express'
import { getUser, getUsers } from '../controller/user.controller.js';
const userRouter=Router();

userRouter.get('/',getUsers)

userRouter.get('/:id',getUser)


userRouter.post('/',(req,res)=>{
    res.send({title:'CREATE new user'})
})


userRouter.put('/:id',(req,res)=>{
    res.send({title:'UPDATE a user details'})
})


userRouter.delete('/:id',(req,res)=>{
    res.send({title:'DELETE a user'})
})

export default userRouter;