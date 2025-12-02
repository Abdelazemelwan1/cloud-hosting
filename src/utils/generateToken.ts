
import { JWTPayload } from '@/type/type';
import Jwt  from 'jsonwebtoken';
import { serialize } from "cookie";

// Genereate JWT Token
export function generateJWT(jwtpayload:JWTPayload) : string {
    const privateKey =  process.env.JWT_SECRET as string ;
    const token = Jwt.sign(jwtpayload , privateKey, {
        expiresIn: '30d'
    })
    return token
}




//Set Cookie With jwt
export function setCookie(jwtPayload:JWTPayload) {
    const  token = generateJWT(jwtPayload)
    const cookie = serialize("jwtToken" , token , {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 30 ,
        }
    )
    return cookie
}