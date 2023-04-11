import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import { isValidBody, isValidEmail, isValidPhone, isValidPassword, isValidPincode, isValidName } from '../utils/validation.js'


export const createUser = async (req, res) => {
    try {
        let { name, email, phone, password, addressCity,question, role } = req.body
        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }
        if (!name) {
            return res.status(400).send({ status: false, message: "fname Is Mandatory " });
        }
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "fname should be alphabatical Order And String only" });
        }

        //validation for email
        if (!email) {
            return res.status(400).send({ status: false, message: "email Is Mandatory " });
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid Email" });
        }
        //validation for phone 
        if (!phone) {
            return res.status(400).send({ status: false, message: "phone Is Mandatory" });
        }
        if (!isValidPhone(phone)) {
            return res.status(400).send({ status: false, message: "Invalid phone" });
        }
        if (!question) {
            return res.status(400).send({ status: false, message: "Favorite Game Is Mandatory " });
        }
        if (!addressCity) {
            return res.status(400).send({ status: false, message: "addressCity Is Mandatory " });
        }
        if (!isValidName(addressCity)) {
            return res.status(400).send({ status: false, message: "addressCity should be alphabatical Order And String only" });
        }

        // Check for the uniqueness of email and phone
        let user = await userModel.find({ $or: [{ email }, { phone }] })
        for (let key of user) {
            if (key.email == email.trim().toLowerCase()) {
                return res.status(409).send({ status: false, message: "Given email is already taken" })
            }
            if (key.phone == phone) {
                return res.status(409).send({ status: false, message: "Given phone is already taken" })
            }
        }

        //validation for password
        if (!password) {
            return res.status(400).send({ status: false, message: "password Is Mandatory" });
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Weak Password,Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character" })
        }
        //bcrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        let data = await userModel.create({ name, email, phone, password: hashedPassword,question, role, addressCity })
        return res.status(201).send({ status: true, message: "User created successfully", data });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}



export const login = async (req, res) => {
    try {
        let data = req.body;
        let { email, password } = data

        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }
        //validation for email
        if (!email) {
            return res.status(400).send({ status: false, message: "email Is Mandatory " });
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid Email" });
        }
        //validation for password
        if (!password) {
            return res.status(400).send({ status: false, message: "password Is Mandatory" });
        }
        //find user from dataBase
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
        }
        let correctPass = await bcrypt.compare(password, user.password)
        if (!correctPass) {
            return res.status(400).send({ status: false, message: "Invalid Password" });
        }
        let userId = user._id;
        const token = jwt.sign({ userId: userId }, process.env.SECRET, { expiresIn: "1d" });
        res.status(200).send({ status: true, message: "User logged in successfully", data: { user, token } });
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


export const forgotPass = async (req, res) => {
    try {
        const {email,question,newPassword}=req.body


        if (!email) {
            return res.status(400).send({ status: false, message: "Email is Require" });
        }

        if (!question) {
            return res.status(400).send({ status: false, message: "question is Require" });
        }

        if (!newPassword) {
            return res.status(400).send({ status: false, message: "New Password is Require" });
        }
        if (!isValidPassword(newPassword)) {
            return res.status(400).send({ status: false, message: "Weak Password,Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character" })
        }


        let user = await userModel.findOne({email,question})
        if (!user) {
            return res.status(404).send({ status: false, message: "Email or question is Incurrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        
        await userModel.findByIdAndUpdate(user._id,{password:hashedPassword})

        res.status(200).send({ status: true, message: "Password Reset successfully"});
    
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



export const getUser = async (req, res) => {
    try {
        //let userId = req.params.userId
        let findUser = await userModel.find().select({ _id: 0, name: 1, email: 1, phone: 1, addressCity: 1 })
        return res.status(200).send(findUser)
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





