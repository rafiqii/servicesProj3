import path from "path";
import jwt, { Secret } from "jsonwebtoken"
import userInfo from "../interfaces/userIfno";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from 'express';

export function authUser(req:Request,res:Response,next:NextFunction){
    const token:string|undefined= req.header('x-auth')
    if(!token){
        return res.status(401).send("Please login first")
    }
    try{
        const env = dotenv.config({path: path.normalize(path.resolve(__dirname, "../environment/.env"))})
        const signature:Secret=process.env.jwtSignature as Secret;
        const payload =jwt.verify(token, signature) as userInfo;
        // console.log(payload)
        if(payload == null)
            return res.status(400).send("invalid token")
        req.user=payload;
        next();
    }
    catch(error){
        return res.status(400).send("invalid token")
    }


}