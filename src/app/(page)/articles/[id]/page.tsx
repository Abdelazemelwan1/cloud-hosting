import AddCommentForm from "@/app/_componant/Comments/AddCommentForm";
import CommentItem from "@/app/_componant/Comments/CommentItem";
import { SingleArticle, SingleArticlepageProps } from "@/type/type";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import prisma from "@/type/db";
import {  redirect } from "next/navigation";

export default async function SingleArticlePage({params}:SingleArticlepageProps) {
  const token = (await cookies()).get('jwtToken')?.value || "";
  const payload = verifyTokenForPage(token)



   const art = await prisma.article.findUnique({
              where : {id: parseInt(params.id)},
              include: {
                  comments : {
                      include: {
                          user : {
                              select : {
                                  username : true,
                              }
                          }
                      },
                      orderBy : {
                          createdAt: "desc"
                      }
                  }
              }
          }) as SingleArticle;

          if (!art) {
            redirect("/not-found");
          }

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4 mt-5">
        <div className="bg-white p-7 rounded-lg mb-7">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">{art.title}</h1>
            <div className="text-gray-400">{new Date(art.createdAt).toDateString()}</div>
            <p className="text-gray-800 text-xl mt-5">{art.description}</p>
        </div>
        <div className="mt-7">
          {payload ?(
            <AddCommentForm articleId={art.id}/>

          ) : (
            <p className="text-blue-600 md:text-xl">to write a comment you should log in first</p>
          )}
        </div>
        <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">Comments</h4>
        {art.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
        ))}
    </section>
  )
}
