import { roles } from "../enum/role";
import Iuser from "./Iuser";

export default interface userInfo{
    _id:Iuser;
    role: roles;
}