"use client"

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";




export default function AddArticleForm() {
    const router  = useRouter();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    // const router = useRouter();

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        if (title === "") return toast.error("Title is required")
        if (description === "") return toast.error("Description is required")
            
            try {
                await axios.post(`${DOMAIN}/api/articles` , {title , description})
                setTitle("");
                setDescription("");
                toast.success("New article added");
                router.refresh();
            } catch (error:unknown) {
                // toast.error(error?.response?.data.message);
                 if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("An unexpected error occurred");
      }
                console.log(error);
                
            }
            
    }



    return (
            <form className="flex flex-col" onSubmit={formSubmitHandler}>
                <input className="mb-1 border rounded p-2 bg-white text-xl" 
                type="text" 
                placeholder="Enter You Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                />

                <textarea className="mb-4 p-2 lg:text-xl rounded bg-white resize-none" 
                rows={5} 
                placeholder="Enter Artilce Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button  type="submit" className="cursor-pointer w-full text-xl mt-4 text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold m-auto">Add</button>
            </form>
    )
}
