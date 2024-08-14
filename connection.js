import mongoose from "mongoose";

const MONGO_URL="mongodb://localhost:27017/prime_generator";
const connectDB= async ()=>{
    try{
       await mongoose.connect(MONGO_URL) ;
       console.log("\nMongodb connected!");
    }
    catch(error){
        console.log("\nMongoDb connection failed",error);
    }
}
export default connectDB;