import Iuser from "../interfaces/Iuser";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { roles } from "../enum/role";
import jwt, { Secret } from "jsonwebtoken";
import path from "path";

const env = dotenv.config({path: path.resolve(__dirname, "../env/.env")})
const userSchema = new mongoose.Schema<Iuser>({
    userName: String,
    passWord: String,
    location: String,
    role: Number,
    order: {type: mongoose.Schema.Types.ObjectId, ref:"Order"}
});

userSchema.methods.generateToken=function(){
    const token=jwt.sign({_id:this._id, role:this.role}, process.env.signature as Secret );
    return token;
}
export const User = mongoose.model<Iuser>('User',userSchema); 


