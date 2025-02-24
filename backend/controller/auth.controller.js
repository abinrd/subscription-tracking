import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        // ✅ Ensure all fields are provided
            

        // ✅ Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, error: "User already exists" });
        }

        // ✅ Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create user within transaction
        const [newUser] = await User.create([{ name, email, password: hashedPassword }], { session });

        // ✅ Ensure JWT_SECRET is defined
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: "User has been created",
            data: {
                token,
                user: newUser,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
   

export const signIn=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            const error=new Error('Invalid User');
            error.statusCode=404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            const error=new Error('Invalid Password');
            error.statusCode=401;
            throw error;
        }
        const token= jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        return res.status(200).json({
            success:true,
            message:'User Signed-in succesfully',
            data:{
                token,
                user,
            }

        })

    }catch(error){
        next(error);
    }
    
}

export const signOut=async(req,res,next)=>{
    
}