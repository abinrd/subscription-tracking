import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // References the User model
            required: true,
            index:true,
        },
        planName: {
            type: String,
            required: [true, "Subscription plan name is required"],
            trim: true,
            minLength:2,
            maxLength:100,
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: 0,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "cancelled"],
            default: "active",
        },
        startDate: {
            type: Date,
            required:true,
            validate:{
                validator:function(value){
                    return value <=new Date()
                },
                message:'Start Date must be before Todays Date'
            }
            
        },
        endDate: {
            type: Date,
            validate:{
                validator:function(value){
                    return value >this.startDate
                },
                message:'Renewal Date must be after the StartDate'
            }
        },

        currency:{
            type:String,
            enum:['INR','USD'],
            default:'INR',
        },
        frequency:{
            type:String,
            enum:['daily','weekly','monthly','yearly'],
            default:'monthly',
        },
        payment:{
            type:String,
            required:true,
            trim:true,
        }
    },
    { timestamps: true }
);

subscriptionSchema.pre('save',function(next){
    if(!this.endDate){
        const renewalPeriod = {
            daily :1,
            weekly:7,
            monthly:30,
            yearly:365,
        };
        this.endDate=new Date(this.startDate);
        this.endDate.setDate(this.endDate.getDate()+renewalPeriod[this.frequency])
    }
    //AutoUpdate the status if endDate has passed
    if(this.endDate<new Date()){
        this.status='expired';
    }
    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
