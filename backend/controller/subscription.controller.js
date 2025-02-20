import { SERVER_URL } from "../config/env.js"
import { workflowClient } from "../config/upstash.js"
import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req,res,next)=>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id
        })
        res.status(201).json({success:true,data:subscription})
    }catch(error){
        next(error)
    }
}

export const getUserSubscriptions = async(req,res,next)=>{
    try{
        if(req.user.id !==req.params.id){ //Checking if the user is the same as the one in the token
            const error = new Error('You are not authorized')
            error.status=401;
            throw error;
        }
        const subscriptions = await Subscription.find({user:req.params.id});

      const {workflowRunId} = await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body:{
                subscriptionId:Subscription.id,
            },
            headers:{
                'content-type': 'application/json'
            },
            retries :0,
        })

        res.status(200).json({success:true,data:{subscriptions,workflowRunId}})

    }catch(error){
        next(error);
    }
}