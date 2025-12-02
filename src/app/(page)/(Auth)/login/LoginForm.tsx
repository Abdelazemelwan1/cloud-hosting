"use client"

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from 'react-toastify';


export default function LoginForm() {

    const router = useRouter()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false)

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        if(email === "") return toast.error("email is required")
        if(password === "") return toast.error("password is required")


        try {
            setLoading(true)
            await axios.post(`${DOMAIN}/api/users/login` , {email , password})
            router.replace('/')
            setLoading(false)
            router.refresh()
        } catch (error:unknown) {
            // toast.error(error?.response?.data.message)
                  if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Request failed");
      } else {
        toast.error("An unexpected error occurred");
      }
            setLoading(false)
        }
        
        // const jwtTokne = "iuiiuk";
        // localStorage.setItem("token" , jwtTokne)
        // localStorage.getItem("token")
        
        // console.log({email , password})
    }


    return (
            <form className="flex flex-col" onSubmit={formSubmitHandler}>
                <input className="mb-1 border rounded p-2  text-xl" 
                placeholder="Enter You Email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />

                <input className="mb-1 mt-3 border rounded p-2 text-xl"
                placeholder="Enter You password" 
                type="password" 
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)} />
                
                <button disabled={loading}  type="submit" className="cursor-pointer w-full text-xl mt-4 text-white bg-blue-800 p-2 rounded-lg font-bold m-auto">
                    {loading ? <BarLoader className="m-auto"/> : "Login"}
                </button>
            </form>
    )
}
