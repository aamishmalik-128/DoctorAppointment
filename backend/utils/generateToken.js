import jwt from 'jsonwebtoken'





export const generateAccessToken = (user)=>{
    return jwt.sign({id:user._id,role:user.role},
        process.env.JWT_ACCESS_SECRET,
        {
        expiresIn:process.env.JWT_EXPIRES,
    })
}

export const generateRefreshToken=(user)=>{
    return jwt.sign({
        id:user._id,
        role:user.role,
    },
    process.env.JWT_REFRESH_ACCESS_SECRET,{
        expiresIn: "7d",
    }
)
}
