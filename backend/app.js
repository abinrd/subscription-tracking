import {PORT} from './config/env.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import subscriptionRouter from './routes/subscription.route.js'
import express from "express";
const app = express();

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)

app.get("/",(req,res)=>{
    res.send("welcome to subscription tracker api")
})


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})


export default app;