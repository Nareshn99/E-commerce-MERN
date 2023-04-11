import express from "express";
import { createUser, forgotPass, getUser, login } from "../controllers/userController.js";
import { isAdmin, reqSignIn } from "../middelwares/userAuth.js";
const authRouter=express.Router()



//user Api
authRouter.post("/register",createUser);
authRouter.post("/login",login);
authRouter.post("/forgot-password",forgotPass)
authRouter.get("/getUser",reqSignIn,isAdmin, getUser)

//user route
authRouter.get("/user-auth",reqSignIn,(req,res)=>{
    res.status(200).send({status:true,Ok:true})
})

//admin route
authRouter.get("/admin-auth",reqSignIn,isAdmin,(req,res)=>{
    res.status(200).send({status:true,Ok:true})
})

export default authRouter;