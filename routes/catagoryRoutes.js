import express from "express";
import { createCatagory, deleteCatagory, getAllCatagory, getSingleCatagory, updateCatagory } from "../controllers/catagoryController.js";
import { isAdmin, reqSignIn } from "../middelwares/userAuth.js";
const catagoryRouter=express.Router()



catagoryRouter.post("/add-catagory",reqSignIn,isAdmin,createCatagory)
catagoryRouter.put("/update-catagory/:id",reqSignIn,isAdmin,updateCatagory)
catagoryRouter.get("/get-all-catagory",getAllCatagory)
catagoryRouter.get("/get-single-catagory/:slug",reqSignIn,isAdmin,getSingleCatagory)
catagoryRouter.delete("/delete-catagory/:id",reqSignIn,isAdmin,deleteCatagory)

export default catagoryRouter;