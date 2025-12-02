
import{z} from "zod"

// create Article Schema
export const createArticleSchema = z.object({
    title: z.string({
        required_error:  'title is required',
        invalid_type_error: 'title should be of type string'
    }).min(2, {message : "title shold be at least 2 chacters long"}).max(200, {message : "title shold be  least then 200 chacters "}),
    description: z.string().min(10).max(200),
})

//Register Schema
export const registerSchema = z.object({
    username: z.string().min(2).max(100),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
})

//Login Schema
export const LoginSchema = z.object({
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
})

// Creact Comment Schema
export const createCommentShema = z.object({
    text: z.string().min(2).max(500),
    articleId: z.number(),
})


//Update User profile Schema
export const UpdateUserSchema = z.object({
    username: z.string().min(2).max(100).optional,
    email: z.string().min(3).max(200).email().optional,
    password: z.string().min(6).optional,
})