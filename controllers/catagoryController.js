import catagoryModel from "../models/catagoryModel.js"
import slugify from 'slugify'


export const createCatagory = async (req, res) => {
    try {
        const {name}=req.body;
        if (!name) {
            return res.status(400).send({ status: false, message: "Name Is Mandatory" });
        }
        //find catagory from dataBase
        let catagory = await catagoryModel.findOne({ name });
        if (catagory) {
            return res.status(400).send({ status: false, message: "Catagory Already Exist" });
        }

        const data=await catagoryModel.create({name,slug:slugify(name)})
        return res.status(201).send({ status: true, message: "Catagory created successfully", data });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



export const updateCatagory = async (req, res) => {
    try {
        const {name}=req.body;
        if (!name) {
            return res.status(400).send({ status: false, message: "Name Is Mandatory" });
        }
        //find catagory from dataBase
        let catagory = await catagoryModel.findOne({ name });
        if (catagory) {
            return res.status(400).send({ status: false, message: "Catagory Already Exist" });
        }

        const data=await catagoryModel.findByIdAndUpdate(req.params.id,{name,slug:slugify(name)},{new:true})
        return res.status(200).send({ status: true, message: "Catagory update successfully", data });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



export const getAllCatagory = async (req, res) => {
    try {
        
        //find catagory from dataBase
        let catagory = await catagoryModel.find();
        if (!catagory) {
            return res.status(404).send({ status: false, message: "Catagory Not Found" });
        }

        return res.status(200).send({ status: true, message: "All Catagory Get Successfully", data:catagory });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


export const getSingleCatagory = async (req, res) => {
    try {
        
        //find catagory from dataBase
        let catagory = await catagoryModel.findOne({slug:req.params.slug});
        if (!catagory) {
            return res.status(404).send({ status: false, message: "Catagory Not Found" });
        }

        return res.status(200).send({ status: true, message: "Catagory Get Successfully", data:catagory });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


export const deleteCatagory = async (req, res) => {
    try {
        
        //find catagory from database and delete
        await catagoryModel.findByIdAndDelete(req.params.id);

        return res.status(200).send({ status: true, message: "Catagory Deleted Successfully"});
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}