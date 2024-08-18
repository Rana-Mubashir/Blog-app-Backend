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
    profileImg:{
        type:String
    },
    coverImg:{
        type:String,
    }
})

export const User= model("User",userSchema)