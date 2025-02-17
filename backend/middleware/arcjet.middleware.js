import aj from "../config/arcjet";

const arcjetMiddleware=async(req,res,next)=>{
    try{
        const decision = await aj.protection(req,{requested:1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit())return res.status(429).json({error:"Rate limit reached"})
            if(decision.reason.isBot())return res.status(429).json({error:"Bot Detected"})

                return res.status(403).json({error:"Access Denied"})
        }
        next()
    }catch(error){
        console.log(`Arcjet Middleware Error:${error}`)
        next(error)
    }
}

export default arcjetMiddleware