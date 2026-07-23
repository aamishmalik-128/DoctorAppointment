import {validationRequest} from 'express-validator'


const validateRequest = (req,res,next)=>{
    const errors = validateRequest

    if(!errors.isEmpty()){
        return res.status(400).json({sucess:false,errors})
    }
        next()
}