import { cookies } from 'next/headers'
import {NextRequest , NextResponse} from 'next/server'
/**
 * @method GET
 * @route ~/api/users/logout
 * @desc logout User
 * @access public 
 */

export function GET(_request:NextRequest) {
    try {
        cookies().delete("jwtToken");
        return NextResponse.json({message:'logout'},{status:200})
    } catch (_error) {
        return NextResponse.json(
            {message: 'internale server error'},
            {status : 500}
        )
    }
}