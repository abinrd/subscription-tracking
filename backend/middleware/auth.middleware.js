import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import {  JWT_SECRET } from '../config/env.js';

const authorize = async(req,res,next)=>{
    try{
        let token ;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
            return res.status(401).json({message:'Unauthorized Access'})
        }
        const decoded= jwt.verify(token,JWT_SECRET)
        const user = await User.findById(decoded.userId);

        if(!user){
            res.status(401).json({message:'Unauthorized Access'})
    }
    req.user=user;
    next();
    
    
}catch(error){
    res.status(401).json({message:'Unauthorized Access',error:error.message})
}}

export default authorize