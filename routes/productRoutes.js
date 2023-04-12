import express from "express";
import { isAdmin, reqSignIn } from "../middelwares/userAuth.js";
import { createProduct, deleteProduct, getAllProduct, getProductPhoto, getSingleProduct, updateProduct } from "../controllers/productController.js";
const productRouter=express.Router()



productRouter.post("/add-product",reqSignIn,isAdmin,createProduct)
productRouter.put("/update-product/:id",reqSignIn,isAdmin,updateProduct)
productRouter.get("/get-all-product",getAllProduct)
productRouter.get("/product-photo/:pid",getProductPhoto)
productRouter.get("/get-single-product/:slug",reqSignIn,isAdmin,getSingleProduct)
productRouter.delete("/delete-product/:id",reqSignIn,isAdmin,deleteProduct)

export default productRouter;