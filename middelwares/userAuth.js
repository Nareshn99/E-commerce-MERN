import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import { isValidObjectId } from "../utils/validation.js";


export const reqSignIn = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    
    if (typeof token == "undefined") return res.status(400).send({ status: false, message: "Token is missing" });
     
    jwt.verify(token, process.env.SECRET, function (err, data) {
      if (err) {
        return res.status(400).send({ status: false, message: err.message })
      } else {
        req.decodedToken = data;
        next()
      }
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ status: false, error: err.message })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    let adminId = req.decodedToken.userId;
    
    let admin = await userModel.findById(adminId);
    if (admin.role!==1) return res.status(401).send({ status: false, message: "Unauthorized Access" });
   
    next();
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message })
  }
}
