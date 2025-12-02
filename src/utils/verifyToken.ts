import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { JWTPayload } from '@/type/type';

// VeriFy Token For Api End Point
export function verifyToken(request:NextRequest) : JWTPayload | null {
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string;
        if(!token) return null;

        const privatekey = process.env.JWT_SECRET as string;
        const userPayload = jwt.verify(token , privatekey) as JWTPayload;
        return userPayload
        
    } catch (_error) {
        return null
    }
}


// Verify Token for Page
export function verifyTokenForPage(token: string) : JWTPayload | null {
    try {

        const privatekey = process.env.JWT_SECRET as string;
        const userPayload = jwt.verify(token , privatekey) as JWTPayload;
        if (!userPayload) return null; 
        return userPayload
        
    } catch (_error) {
        return null
    }
}