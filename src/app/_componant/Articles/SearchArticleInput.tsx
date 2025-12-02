"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function SearchArticleInput() {
    const router = useRouter()
    const [searcText, setSearcTextTitle] = useState("")

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
            console.log({searcText });
            router.push(`/articles/search?searcText=${searcText}`)
    }



    return (
            <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
                <input className="w-full border-none rounded p-3 text-xl text-gray-900 bg-white" 
                type="search" 
                placeholder="Search for article" 
                value={searcText} 
                onChange={(e) => setSearcTextTitle(e.target.value)}
                />
            </form>
    )
}
