import Iorder from "./Iorder";
import {roles} from "../enum/role"
export default interface Iuser{
    userName: string;
    passWord: string;
    location: string;
    role: roles;
    orders: Iorder;
    generateToken(): any;
}