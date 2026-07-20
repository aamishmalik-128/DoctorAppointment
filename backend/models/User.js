import mongoose from 'mongoose'
import  {ROLES}  from '../constants/roles.js'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'Full name is required'],
        trim:true,
        minlength:3,
        maxlength:100,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:6,
        select: false,
    },
    role:{
        type:String,
        enum:Object.values(ROLES),
        required:true
    },
    isVerified:{
        type:Boolean,
        default:true,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    avatar:{
        type:String,
        default:""
    },
    
    refreshToken:{

    type:String,

    default:null,

    select:false

},

},{timestamps:true})

userSchema.pre("save",async function() {
    if(!this.isModified("password")){
        return next()
    }
    const saltRounds = Number(process.env.BCRYPT_SALT);
    console.log(saltRounds)
        this.password=await bcrypt.hash(this.password,saltRounds)
    
})

userSchema.methods.comparePassword = async function name(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
const User = mongoose.model("User",userSchema);
export default User;