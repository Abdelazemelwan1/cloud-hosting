import { Article , Comment , User } from "@prisma/client";

export type ArticleData = {
    userId:number,
    id:number,
    title: string,
    body: string
}

export type CommentWithUser = Comment & { user : User}; 
export type SingleArticle = Article & { comments : CommentWithUser[]}; 

export interface ArticleItemProps {
    article : Article
}

export interface ErrorPageProps {
    error: Error,
    reset: () => void;
}

export interface SingleArticlepageProps {
    params: {id: string}
}

export interface LoginFormValues {
  email: string;
  password: string;
}
export interface AuthState {
  token: string | null;
  userData: string  | null;
}

export interface AdminDashboardLayoutprops {
    children : React.ReactNode ;
}

export interface SearchArticlePageProps {
  searchParams : {searcText:string}
}

export interface CreateArticleDto {
    title : string,
    description : string
}
export interface UpdateArticleDto {
    title? : string,
    description? : string
}

export interface RegisterUserDto {
    username : string,
    email : string
    password : string
}
export interface LOginUserDto {
    email : string
    password : string
}


export type JWTPayload = {
    id: number,
    isAdmin:boolean;
    username: string
}

export interface UpdateUserDto {
    username? : string,
    email? : string
    password? : string
}
export interface CreaCommentDto {
    text : string,
    articleId : number
}
export interface UpdateCommentDto {
    text : string,
}