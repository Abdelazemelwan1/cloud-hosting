import { NextRequest , NextResponse } from "next/server";
import prisma from "@/type/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreaCommentDto } from "@/type/type";
import { createCommentShema } from "@/type/validationShemas";


/**
 * @method POST
 * @route ~/api/comments
 * @desc Create New Comment
 * @access private
 */  


export async function POST(request:NextRequest) {
    try {
        const user = verifyToken(request);
        if(!user){
            return NextResponse.json(
                {message: 'only logged in user, access denied'} , {status: 401}
            )
        }
        const body = await request.json() as CreaCommentDto;
        const validation = createCommentShema.safeParse(body);
        if(!validation.success){
            return NextResponse.json(
                {message : validation.error.issues[0].message} , {status : 400}
            )
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId:user.id,
            }
        });
        return NextResponse.json(newComment, {status:201});
    } catch (_error) {
        return NextResponse.json(
            {message: 'internal server error'} , {status: 500}
        )
    }
}


/**
 * @method GET
 * @route ~/api/comments
 * @desc Get All Comments
 * @access private(only admin)
 */  


export async function GET(request:NextRequest) {
    try {
        const user = verifyToken(request);
        if(!user === null || user?.isAdmin === false){
            return NextResponse.json(
                {message: 'only admin, access denied'} , {status: 403}
            )
        }

        const Comments = await prisma.comment.findMany();
        return NextResponse.json(Comments, {status:200});
        
    } catch (_error) {
        return NextResponse.json(
            {message: 'internal server error'} , {status: 500}
        )
    }
}