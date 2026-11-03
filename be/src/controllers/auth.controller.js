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
    const {email , password , contact , fullName , isSeller} = req.body ; 

    try {
        
        const existingUser = await userModel.findOne({ $or : [{email} , {contact}] }); 

        if(existingUser){
            console.log("User already Exists") ; 
            return res.status(403).json({
                message : "User Already Exists"
            })
        }

        const user = await userModel.create({
            email , 
            password , 
            contact , 
            fullName , 
            role : isSeller ? "seller" : "buyer"
        })

        await createToken(user , res , "User Registered Sucessfully") ; 

    } catch (error) {
        console.log(error) ; 
        return res.status(500).json({message : "Unable to register right now"})
    }
}

export const login = async(req , res)=>{
    const {email , password} = req.body ; 

    try {
        const user = await userModel.findOne({email}) ;

        if(!user){
            return res.status(404).json({
                message : "User Not Found !!"
            })
        }

        const isPasswordValid = await user.comparePassword(password) ;

        if(!isPasswordValid){
            return res.status(403).json({
                message : "Invalid Password !!"
            })
        }

        await createToken(user , res , "Login Successfully") ;
    } catch (error) {
        console.log(error) ;
        return res.status(500).json({message : "Unable to log in right now"})
    }
}