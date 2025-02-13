const errorMiddleware = (err,req,res,next)=>{
    try{
        let error = {...err};
        error.messgae = err.message;
        console.log(err);

        //Mongoose Bad Object

        if(err.name ==='CastError'){
            const message='Resource not found';
            error=new Error(message);
            error.statuscode=404;
        }


        //Mongoose DuplicateKey

        if(err.code === 11000){
          const message ='Duplicate Field Valued enter';
          error=new Error(message);
          error.statuscode=400
        }

        //Mongoose validation error

        if(err.name ==='ValidationError'){
            const message=Object.values(err.errors).map((error) => error.message).join(", ");
            error=new Error(message)
            error.statuscode=400
        }

         res.status(error.statuscode ||500).json({success:false,error:error.message || 'Server Error'})

}catch(error){
    next(error)
}
};

export default errorMiddleware;
