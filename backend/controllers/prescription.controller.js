import * as prescriptionService from '../services/presscription.services.js'


export const createPrescription = async (req,res,next)=>{
    try{
        const prescription = await prescriptionService.createPrescription(req.user.id,req.body)
        return res.status(201).json({
            success: true,
            message: "Prescription created successfully.",
            prescription,
        });
    }catch(error){
        next(error)
    }
}

export const getDoctorPrescriptions = async (req, res, next) => {
    try {
        const result =
            await prescriptionService.getDoctorPrescriptions(
                req.user.id,
                req.query
            );

        return res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        next(error);
    }
};



export const getPrescriptionById = async (req, res, next) => {
    try {

        const prescription =
            await prescriptionService.getPrescriptionById(
                req.user.id,
                req.user.role,
                req.params.id
            );

        return res.status(200).json({
            success: true,
            prescription,
        });

    } catch (error) {
        next(error);
    }
};



export const updatePrescription = async (req, res, next) => {
    try {
        const prescription =
            await prescriptionService.updatePrescription(
                req.user.id,
                req.params.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Prescription updated successfully.",
            prescription,
        });
    } catch (error) {
        next(error);
    }
};


export const getMyPrescriptions = async (req, res, next) => {
    try {

        const result =
            await prescriptionService.getMyPrescriptions(
                req.user.id,
                req.query
            );

        return res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        next(error);
    }
};