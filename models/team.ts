import Iteam from "../interfaces/Iteam";
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    technician1: {type: mongoose.Schema.Types.ObjectId , ref: "User"},
    technician2: {type: mongoose.Schema.Types.ObjectId , ref: "User"},
    ordersWorkedOn: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
})

export const Team = mongoose.model<Iteam>("Team", teamSchema);