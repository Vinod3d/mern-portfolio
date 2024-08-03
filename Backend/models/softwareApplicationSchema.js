import mongoose from "mongoose";

const softwareApplicationSchema = new mongoose.Schema({
   name: String,
   image :{
    public_id :{
        type: String,
        required: true
    },
    url:{
        type:String,
        required:true,
    },
   },
});

const softwareApplication = mongoose.model("softwareApplication", softwareApplicationSchema);
export default softwareApplication;