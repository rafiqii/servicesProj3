import Iorder from "./Iorder";

export default interface Ischedule{
    date:Date;
    hours:(string|Iorder)[];
}