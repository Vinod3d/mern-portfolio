import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
   title: String,
   proficiency: String,
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

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;