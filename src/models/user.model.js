import { Schema,model } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    profileImg:{
        type:String
    },
    
})

export const User= model("User",userSchema)