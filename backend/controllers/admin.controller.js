import * as adminServices from '../services/admin.services.js'



export const getPendingDoctors= async(req,res,next)=>{
    try {
        const doctors=await adminServices.getPendingDoctors()
        return res.status(200).json({
            success:true,
            doctors,
        })
    } catch (error) {
        next(error)
    }
}

export const approveDoctor = async(req,res,next)=>{
    try {
        const doctor = await adminServices.approveDoctor(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Doctor approved Successfully",
            doctor,
        })
    } catch (error) {
        next(error)
    }
}


export const rejectedDoctor=async(req,res,next)=>{
    try {
        const doctor = await adminServices.rejectDoctor(req.params.id);
    return res.status(200).json({
        success:true,
        message:"Doctor rejected Successfully.",
        doctor,
    })
    } catch (error) {
        next(error)
    }
}

export const getAllDoctors=async(req,res,next)=>{
    try {
        const result = await adminServices.getAllDoctors(req.query)
        return res.status(200).json({
            success:true,
            ...result
        })
    } catch (error) {
        next(error)
    }
}