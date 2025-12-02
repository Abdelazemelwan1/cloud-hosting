import prisma from "@/type/db";
import {  LOginUserDto } from "@/type/type";
import { LoginSchema } from "@/type/validationShemas";
import bcrypt from "bcryptjs";
import { NextRequest , NextResponse } from "next/server";
import {setCookie} from '@/utils/generateToken'


/**
 * @method POST
 * @route ~/api/users/login
 * @desc Login User [(Log In)(sign In) (تسجيل الدخول)]
 * @access public 
 */
export async function POST(request : NextRequest) {
    try {

        const body = await request.json() as LOginUserDto
        const validation = LoginSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message: validation.error.issues[0].message} , {status : 400})
        }

        const user = await prisma.user.findUnique({
            where: {email: body.email}
        })
        if (!user) {
            return NextResponse.json({message: 'invalid email or password'} , {status : 400})
        }


        const isPasswordMatch = await bcrypt.compare(body.password , user.password);
        if(!isPasswordMatch){
            return NextResponse.json({message: 'invalid email or password'} , {status : 400})
        }

        // @Todo -> generate JWT Token


        const cookie = setCookie({
            id : user.id,
            isAdmin: user.isAdmin,
            username : user.username
        })
        return NextResponse.json({message: 'Authenticated'} , 
            {
                status : 200,
                headers: {"Set-Cookie" : cookie}
            }
        )


    } catch (error) {
                console.log(error);

        return NextResponse.json(
            {message : "internal server error"} , {status: 500}
        )
    }
}