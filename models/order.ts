import Iorder from "../interfaces/Iorder";
import mongoose from "mongoose"
import { EStatus } from "../enum/orderStatus";

const orderSchema = new mongoose.Schema({
    time:String,
    date:String,
    team: {type:mongoose.Schema.Types.ObjectId , ref:"Team"},
    orderdBy: {type:mongoose.Schema.Types.ObjectId , ref:"User"},
    visitLength:Number, //Minutes
    status: String
});

export const Order = mongoose.model<Iorder>("Order",orderSchema);

