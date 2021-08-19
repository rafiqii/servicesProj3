import bcrypt from "bcrypt";
import express,{Request, Response} from "express";
import { roles } from "../enum/role";
import { User } from "../models/user";

const router = express.Router();
type user ={
    _id:string,
    userName:string,

};

router.post("/createCustomerAccount", async (req:Request,res:Response): Promise <user>=>{
    const duplicateUserName= await User.findOne({userName: req.body.userName});
    console.log(duplicateUserName)
    if(duplicateUserName)
    {
        res.status(400).send("userName is already taken")
        throw new Error("User is already taken")
    }
    const user = await User.create({userName: req.body.userName,
        passWord: await bcrypt.hash(req.body.passWord,await bcrypt.genSalt(10)),
        role: roles.customer
        
    });

    await user.save();
    res.send("user saved")
    return ({_id: user._id, userName: user.userName});
});

router.post("/createTechnicianAccount", async (req:Request,res:Response): Promise <user>=>{
    const duplicateUserName= await User.findOne({userName: req.body.userName});
    if(duplicateUserName)
    {
        res.status(400).send("userName is already taken")
        throw new Error("User is already taken")
    }
    const user = await User.create({userName: req.body.userName,
        passWord: await bcrypt.hash(req.body.passWord,await bcrypt.genSalt(10)),
        role: roles.technician
        
    });

    await user.save();
    res.send("user saved")
    return ({_id: user._id, userName: user.userName});
});

export default router;