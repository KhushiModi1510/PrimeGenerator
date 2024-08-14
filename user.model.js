import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    algo_id:{
        type:Number,
        required:true
    },
    start_range:{
        type:Number,
        required:true
    },
    end_range:{
        type:Number,
        required:true
    },
    total_primes:{
        type:Number,
        required:true
    },
    time_elapsed:{
       type:Number,
       required:true
    },
    time_stamp:{
        default:Date.now(),
        type:Date
    }
})

const User=mongoose.model("User",userSchema);
export default User;

