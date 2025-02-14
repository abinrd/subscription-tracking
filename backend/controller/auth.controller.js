import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';

export const signUp=async(req,res,next)=>{
const session=await mongoose.startSession();
session.startTransaction();
    try{
        const{name,email,password}=req.body; //need this req tobe filled by the user
//checking for existing user
        const ExistingUser=await User.findOne({email});
        if(ExistingUser){
            const error=new Error('User already exist');
            error.statusCode=409;
            throw error;
        }
        //Hash Password
        const salt= await bcrypt.genSalt(10);
        const HashedPassword=await bcrypt.hash(password,salt);

        const newUsers=await User.create([{name,email,password:HashedPassword}], {session});
        const token = jwt.sign({user_Id:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

        await session.commitTransaction();
        session.endSession()

        res.status(201).json({
            success:true,
            message:'User have been Created'
            data:{
                token,
                newUsers[0] 
            }
        })
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}   

export const signIn=async(req,res,next)=>{
    
}

export const signOut=async(req,res,next)=>{
    
}