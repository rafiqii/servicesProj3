import express, {Request, Response} from "express";
import { EStatus } from "../enum/orderStatus";
import { checkAvalibileTeams, checkAvalibility } from "../functions/check";
import { givenTimeInMinutes } from "../functions/dates";
import Iorder from "../interfaces/Iorder";
import Iteam from "../interfaces/Iteam";
import { authUser } from "../middleware/AuthenticateUser";
import { Order } from "../models/order";

const router = express.Router();

router.post("/createOrder", authUser,async (req:Request,res:Response)=>{ 
    let avalibility= await checkAvalibility(req.body.date,req.body.visitLength,req.body.time,req.body.team)
    if(givenTimeInMinutes(req.body.time)<480 || givenTimeInMinutes(req.body.time)>960)
        throw new Error("reservation should be from 8:00 till 16:00")
    if(req.body.visitLength<60)
        throw new Error("can not have less than 1 hour in a visit")
    if(req.body.visitLength>240)
        throw new Error("can not have more than 4 hours in a single visit")
    if(!avalibility)
    {
        throw new Error("time conflict")
    }
    const order = new Order();
    order.date = req.body.date;
    order.team = req.body.team;
    order.time = req.body.time;
    order.visitLength = parseInt(req.body.visitLength);
    order.status=EStatus.upcoming;

    await order.save()

    res.send("saved")
});

router.get('/avalibleTechnicians',async (req, res):Promise <Iteam[]>=>{//req body: date, time, visitLength
    if(givenTimeInMinutes(req.body.time)<480 || givenTimeInMinutes(req.body.time)>960)
        throw new Error("reservation should be from 8:00 till 16:00")
    if(req.body.visitLength<60)
        throw new Error("can not have less than 1 hour in a visit")
    if(req.body.visitLength>240)
        throw new Error("can not have more than 4 hours in a single visit")
    res.send(await checkAvalibileTeams(req.body.date,req.body.visitLength,req.body.time))
    return checkAvalibileTeams(req.body.date, req.body.visitLength, req.body.time);

})

export default router;