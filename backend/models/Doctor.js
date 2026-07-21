import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },
    specialization:{
        type:String,
        required:true,
        trim:true
    },
    qualification:{
        type:String,
        required:true,
        trim:true,
    },
    experience:{
        type:Number,
        required:true,
        min:0,
    },
    consultationFee:{
        type:Number,
        required:true,
        min:0
    },
    hospital:{
        type:String,
        trim:true,
        default:""
    },
    clinicalAddress:{
        type:String,
        required:true,
        trim:true,
    },
    bio:{
        type:String,
        trim:true,
        default:"",
    },
    profileImage:{
        type:String,
        default:""
    },
    profileImage:{
        type:String,
        default:"",
    },
    availableDays:[
        {
            type: String,
                enum: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
        }
    ],
    availableTime:{
        start:{
            type:String,
            default:""
        },
        end:{
            type:String,
            default:""
        },
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",
    },
},{
    timestamps:true
});

const Doctor= mongoose.model("Doctor",doctorSchema);
export default Doctor;