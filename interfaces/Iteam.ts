import Iorder from "./Iorder";
import Iuser from "./Iuser";

export default interface Iteam{
    technician1: Iuser;
    technician2: Iuser;
    ordersWorkedOn: Iorder[];
}