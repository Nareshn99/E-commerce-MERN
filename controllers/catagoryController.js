import catagoryModel from "../models/catagoryModel.js"


export const createCatagory = async (req, res) => {
    try {
        const {name}=req.body;
        if (!name) {
            return res.status(400).send({ status: false, message: "Name Is Mandatory" });
        }
        //find user from dataBase
        let catagory = await catagoryModel.findOne({ name });
        if (catagory) {
            return res.status(400).send({ status: false, message: "Catagory Already Exist" });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}