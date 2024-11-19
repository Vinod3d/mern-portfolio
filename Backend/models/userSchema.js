import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { JWT_EXPIRES, JWT_KEY } from "../config/index.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name Required"],
    },
    email: {
        type: String,
        required: [true, "Email Required"],
    },
    address: {
        type: String,
        required: [true, "Address Required"],
    },
    password: {
        type: String,
        required: [true, "Password Required"],
        select: false
    },
    phone:{
        type:String,
        required:[true,"Phone Number Required"]
    },
    aboutMe:{
        type:String,
        required:[true,"About Me Required"]
    },
    avatar:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required:true
        }
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    portfolio:{
        type: String,
        required: [true, "Portfolio Required"],
    },
    githubURL: String,
    linkedinURL: String,
    twitterURL: String,
    instagramURL:String,
    facebookURL:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

// FOR HASHING PASSWORD
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
       return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


// FOR COMPARING PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// GENERATING JSON WEB TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, JWT_KEY, {expiresIn: JWT_EXPIRES})
}


// GET RESET PASSWORD TOKEN

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

export const User = mongoose.model("User", userSchema);