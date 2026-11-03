import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken" ; 

const createToken = async(user ,  res , message)=>{

    const token = jwt.sign({
        id : user._id , 
    } , config.JWT_SECRET , {
        expiresIn : "7d"
    })

    res.cookie("token" , token) ; 

    res.status(200).json({ 
        message , 
        sucess :  true , 
        token , 
        user : {
            id : user._id , 
            email : user.email ,
            name : user.fullName , 
            role : user.role
        }
    })
}

export const register = async (req , res)=>{
    const {email , password , contact , fullName} = req.body ; 

    try {
        
        const existingUser = userModel.findOne({ $or : [{email} , {contact}] }); 

        if(existingUser){
            console.log("User already Exists") ; 
            res.status(403).json({
                message : "User Already Exists"
            })
        }

        const user = await userModel.create({
            email , 
            password , 
            contact , 
            fullName
        })

        await createToken(user , res , "User Registered Sucessfully") ; 

    } catch (error) {
        console.log(error) ; 
        return res.status(500).json({message : ""})
    }
}