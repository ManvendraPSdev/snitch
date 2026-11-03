import { body , validationResult } from "express-validator";


function validationRes(req , res , next){
    const errors = validationResult(req) ; 
    if(!error.isEmpty()){
        return res.status(404).json({errors : errors.array()})
    }

    next()
}


export const validateRegisterUser = [
    body("email").isEmail().withMessage("Invalid Email Foemat") , 
    body("contact").notEmpty().withMessage("Contact is required !").matches(/^\d{10}$/).withMessage("Must be a 10-digit"),
    body("Password").isLength({min : 6  }).withMessage("Password must be of length 6"),
    body("fullName").notEmpty().withMessage("Full Name is required").isLength({min : 3}).withMessage("Name must be of atleast 3 length"),


    validationRes
]
