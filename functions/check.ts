import Iteam from "../interfaces/Iteam";
import Iuser from "../interfaces/Iuser";
import { Order } from "../models/order";
import { Team } from "../models/team";
import { getHours, getMinutes, givenTimeInMinutes } from "./dates";

export async function checkAvalibility(dates:string, checkingDuration:number, myStartTime:string, technicianTeam:Iteam):Promise <boolean> 
{
    const ordersOfSameTeamAndDate= await Order.find({date:dates, team:technicianTeam});
    
    let checkingStartTime:number=givenTimeInMinutes(myStartTime);
    let checkingEndTime:number= checkingStartTime + checkingDuration;
    let avaliblity:boolean=true;
    checkingStartTime-=15;
    for(let i=0;i<ordersOfSameTeamAndDate.length;i++)
    {
        let scheduledStartTime=givenTimeInMinutes(ordersOfSameTeamAndDate[i].time);
        let scheduledEndTime= scheduledStartTime + ordersOfSameTeamAndDate[i].visitLength;

        scheduledStartTime-=15;

        if(checkingStartTime>=scheduledStartTime && checkingStartTime<=scheduledEndTime)
        {
            return false;
        }
        // this solves case 2
        if(checkingEndTime>=scheduledStartTime && checkingEndTime<=scheduledEndTime)
        {
            return false;
        }
        // this solves case 1
        if(checkingStartTime<=scheduledStartTime && checkingEndTime>=scheduledEndTime)
        {
            return false;
        }//this solves case 3
        
    }
    return true;
}


export async function checkAvalibileTeams(dates:string, checkingDuration:number, myStartTime:string):Promise <Iteam[]> 
{
    const ordersOfSameTeamAndDate= await Order.find({date:dates});
    let teams=await Team.find();
    let checkingStartTime:number=givenTimeInMinutes(myStartTime);
    let checkingEndTime:number= checkingStartTime + checkingDuration;

    checkingStartTime-=15;

    let filtredArray=ordersOfSameTeamAndDate.filter(element=>{
        let scheduledStartTime=givenTimeInMinutes(element.time);
        let scheduledEndTime= scheduledStartTime + element.visitLength;
        scheduledStartTime-=15;

        return ((checkingStartTime>scheduledStartTime && checkingStartTime<scheduledEndTime) ||
        (checkingEndTime>scheduledStartTime && checkingEndTime<scheduledEndTime)||
        (checkingStartTime<scheduledStartTime && checkingEndTime>scheduledEndTime))
    }).map(ele => ele._id)
    .forEach(element =>{
        teams=teams.filter(object=>{object.id==element})
    
    })
    return teams;

}
