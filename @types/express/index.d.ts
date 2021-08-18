import userInfo from "../../interfaces/userIfno";

declare global
{
    namespace Express 
    {
        interface Request 
        {
            user: userInfo
        }

    }
    
}