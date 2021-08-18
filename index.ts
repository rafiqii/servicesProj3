import express from "express";
import dotenv from "dotenv";
import path from "path";
import  mongoose  from "mongoose";

import loginRoute from "./login/login"
import orderRoute from "./routes/order"
import teamRoute from "./routes/team"
import userRoute from "./routes/user"
const app= express();

//extra settings
app.use(express.urlencoded({extended: true}));

//connecting to the database  
const env=dotenv.config({path: path.normalize(path.resolve(__dirname, "../environment/.env"))});
if(!process.env.dbconnection)
{
       console.log(`there is no database: ${process.env.dbconnection}`)
       process.exit(0);
}
else{
       console.log("connected to db")
}
mongoose.connect(process.env.dbconnection, {useNewUrlParser: true,  useUnifiedTopology: true })

app.listen(3000)
app.use("/login",loginRoute)
app.use("/order",orderRoute)
app.use("/team",teamRoute)
app.use("/user",userRoute)