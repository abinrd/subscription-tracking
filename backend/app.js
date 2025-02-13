import {PORT} from './config/env.js'
import ConnectToDataBase from './database/mongodb.js'
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


const startServer = async () => {
    try {
        await ConnectToDataBase(); // ✅ Now it's being used
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database connection failed", error);
        process.exit(1); // Stop execution if DB fails
    }
};

startServer();


export default app;