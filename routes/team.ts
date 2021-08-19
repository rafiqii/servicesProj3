import express from "express";
import { Request, Response } from "express";
import { roles } from "../enum/role";
import Iteam from "../interfaces/Iteam";
import Iuser from "../interfaces/Iuser";
import { Team } from "../models/team";
import { User } from "../models/user";
const router= express.Router();

type technicianTeam={
    _id?:string,
    technician1:Iuser,
    technician2:Iuser,
    
}
type techTeams={
    teams: Iteam[];
}
router.post("/createTeam", async (req:Request,res: Response):Promise <technicianTeam> =>{

    const technician1= await User.findById(req.body.technician1)
    if(!technician1)
        throw new Error("technician1 is not registered")
    if(technician1.role==roles.customer)
        throw new Error("technician1 is not a technician")
        
    const technician2= await User.findById(req.body.technician2)
    if(!technician2)
        throw new Error("technician1 is not registered")
    if(technician2.role==roles.customer)
        throw new Error("technician1 is not a technician")

    if((await Team.findOne({$or:[{technician1: req.body.technician1, technician2: req.body.technician1}]})))
        throw new Error("technician1 is alread in a team")
        
    if((await Team.findOne({$or:[{technician1: req.body.technician2, technician2: req.body.technician2}]})))
        throw new Error("technician2 is alread in a team")
    
    const team= await Team.create({technician1: req.body.technician1,
    technician2: req.body.technician2,
    ordersWorkedOn: []
    });
    res.send("saved")
    return (team)
});

router.get("/getAvalibleTeams", async (req:Request,res:Response):Promise <techTeams>=>{
    const teams =await Team.find();
    res.send(teams);
    return({teams: teams});
})


export default router