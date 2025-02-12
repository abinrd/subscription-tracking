import mongoose from 'mongoose';
import{DB_URI,NODE_ENV} from '../config/env.js'
 
if(!DB_URI){
    throw new Error('please define the MONGDB_URI variable inside  .env.<development/production>.local')
}

const ConnectToDataBase = async()=>{
    try{
        await mongoose.connect(DB_URI)
        console.log(`Connected to Database in ${NODE_ENV}mode`);
    }catch(error){
        console.log('Error connecting to the DataBase',error);
        process.exit(1);
    }
}

export default ConnectToDataBase; 