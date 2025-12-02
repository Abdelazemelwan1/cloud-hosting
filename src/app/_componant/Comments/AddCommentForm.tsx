"use client"
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
    articleId : number;
}


export default function AddCommentForm({articleId} : AddCommentFormProps) {
    const router = useRouter()
    const [text, setText] = useState("")

    const formSubmitHandler =async (e:React.FormEvent) => {
        e.preventDefault();
        if (text === "") return toast.error("Please Write something")
            try {
                await axios.post(`${DOMAIN}/api/comments` , {text , articleId});
                router.refresh();
                setText("")
            } catch (error:unknown) {
                // toast.error(error?.response?.data.message)
                      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("An unexpected error occurred");
      }
            }
            
    }



    return (
            <form className="" onSubmit={formSubmitHandler}>
                <input className="w-full  rounded-lg p-2 text-xl focus:shadow-md bg-white mb-2" 
                type="text" 
                placeholder="Add a comment...." 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="bg-green-700 text-white mt-2 py-2 cursor-pointer px-4 w-min text-xl rounded-lg hover:bg-green-900 transition">Comment</button>
            </form>
    )
}
