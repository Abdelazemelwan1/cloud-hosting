import prisma from '@/type/db'
import {NextResponse , NextRequest} from 'next/server'
import { verifyToken } from '@/utils/verifyToken'
import { UpdateUserDto } from '@/type/type'
import bcrypt from 'bcryptjs'
import { UpdateUserSchema } from '@/type/validationShemas'

interface props{
    params : {id: string}
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete profile
 * @access private 
 */

export async function DELETE(request: NextRequest, {params} : props){
    try {
        console.log(request.headers);
        
        const user = await prisma.user.findUnique({
            where: {id: parseInt(params.id)},
            include: {comments:true}
        });
        if (!user) {
            return NextResponse.json(
                {message: 'user not found'}, {status : 404}
            )
        }

        const userFromToken = verifyToken(request)

       if (userFromToken !== null && userFromToken.id === user.id) {
        // deleting the user
            await prisma.user.delete({where: {id: parseInt(params.id)}});
            // deleting the comments thet belong to this user
            const commentIds = user?.comments.map(Comment => Comment.id)
            await prisma.comment.deleteMany({
                where: {
                    id: {in : commentIds}
                }
            })
            return NextResponse.json({message: 'your profile (account) has been deleted'} , {status: 200})
       }
    return NextResponse.json(
        {message : 'only user himself can delete his profile, forbidden'} , {status : 403}
    )

    } catch (error) {
        return NextResponse.json(
            {message:"internal server error"} , {status : 500}
        )
    }
}


/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc Get profile By Id
 * @access private 
 */

export async function GET(request:NextRequest , {params} : props) {
    try {
        const user = await prisma.user.findUnique({
            where:{id:parseInt(params.id)},
            select:{
                id: true,
                email:true,
                username:true,
                createdAt:true,
                isAdmin:true,
            }
        })
        if(!user){
            return NextResponse.json({message: 'user not found'} , {status:404})
        }
        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json(
                {message: 'you are not allowed, access denied'} , {status: 403}
            )
        }
        return NextResponse.json(user, {status : 200});
    } catch (error) {
        return NextResponse.json({message : 'internal server error'} , {status : 500})
    }
}



/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update profile
 * @access private 
 */



export async function PUT(request:NextRequest , {params} : props) {
    try {
        const user = await prisma.user.findUnique({
            where:{id:parseInt(params.id)},
            // select:{
            //     id: true,
            //     email:true,
            //     username:true,
            //     createdAt:true,
            //     isAdmin:true,
            // }
        })
        if(!user){
            return NextResponse.json({message: 'user not found'} , {status:404})
        }
        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json(
                {message: 'you are not allowed, access denied'} , {status: 403}
            )
        }
        const body = await request.json() as UpdateUserDto;
        const validation = UpdateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {message: validation.error.issues[0].message} , {status: 400}
            )
        }
        if(body.password){
       
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password , salt)
        }
        const updatedUser = await prisma.user.update({
            where: {id:parseInt(params.id)},
            data : {
                username: body.username,
                email: body.email,
                password:body.password
            }
        })
        const { password, ...other} = updatedUser
        return NextResponse.json({...other} , {status : 200});
    } catch (error) {
        return NextResponse.json({message : 'internal server error'} , {status : 500})
    }
}
