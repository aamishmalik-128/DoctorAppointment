import mongoose from 'mongoose';
const medicationSchema = new mongoose.Schema({
    medicine:{
        type:String,
        required:true,
        trim:true,
    },
    dosage:{
        type:String,
        required:true,
        trim:true
    },
    frequency:{
        type:String,
        required:true,
        trim:true
    },
    duration:{
        type:String,
        required:true,
        trim:true
    },
    instructions:{
        type:String,
        default:"",
        trim:true
    },
},{_id:false})


const prescriptionSchema = new mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
            unique: true,
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        diagnosis: {
            type: String,
            required: true,
            trim: true,
        },

        medications: [medicationSchema],

        tests: [
            {
                type: String,
                trim: true,
            },
        ],

        advice: {
            type: String,
            default: "",
            trim: true,
        },

        followUpDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Prescription = mongoose.model(
    "Prescription",
    prescriptionSchema
);

export default Prescription;