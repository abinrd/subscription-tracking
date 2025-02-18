import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controller/subscription.controller.js";
const subscriptionRouter=Router();

subscriptionRouter.get('/',authorize,(req,res)=>{
    res.send({title:"GET all subscription details"})
})


subscriptionRouter.get('/:id',(req,res)=>{
    res.send({title:"GET a subscription detail"})
})


subscriptionRouter.post('/',authorize,createSubscription); //Create a subscription


subscriptionRouter.put('/:id',(req,res)=>{
    res.send({title:"UPDATE a subscription details"})
})


subscriptionRouter.delete('/:id',(req,res)=>{
    res.send({title:"DELETE a subscription details"})
})

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions) //Get all subscriptions linked with the user

subscriptionRouter.put('/:id/cancel',(req,res)=>{
    res.send({title:"CANCEL a user subscription details"})
})

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title:"UPCOMING  subscription details"})
})


export default subscriptionRouter;