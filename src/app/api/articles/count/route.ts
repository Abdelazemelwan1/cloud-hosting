import prisma from "@/type/db";
import { NextRequest , NextResponse } from "next/server";




/**
 * @method GET
 * @route ~/api/articles/count
 * @desc Get Article Count
 * @access public 
 */


export async function GET(request: NextRequest) {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count} , {status: 200});
    } catch (error:unknown) {
        return NextResponse.json(
            {message : 'internal server error'} , {status: 500}
        )
        
    }
}