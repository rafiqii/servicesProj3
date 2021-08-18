import { EStatus } from "../enum/orderStatus";
import Iteam from "./Iteam";
import Iuser from "./Iuser";

export default interface Iorder{
    time: string;
    date: string;
    team: Iteam;
    status:EStatus;
    visitLength:number;
    orderdBy: Iuser;
}
