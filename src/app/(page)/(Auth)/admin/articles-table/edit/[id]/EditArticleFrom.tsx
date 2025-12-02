
"use client"
import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";
import axios from "axios";
// import { LoginFormValues } from "@/type/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFromProps {
    article: Article
}


export default function EditArticleFrom({article} : EditArticleFromProps) {    
  const router  = useRouter();
    const [title, setTitle] = useState(article.title)
    const [description, setDescription] = useState(article.description)
    // const router = useRouter();

    const formSubmitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        if (title === "") return toast.error("Title is required")
        if (description === "") return toast.error("Description is required")
            
            try {
                await axios.put(`${DOMAIN}/api/articles/${article.id}` , {title , description})
                toast.success("article updated");
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


    // function handleLogin(values : LoginFormValues) {
    //     setIslooding(true)
    //     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values , {headers: {
    //             "Cache-Control": "no-cache, no-store, must-revalidate",
    //             "Pragma": "no-cache",
    //             "Expires": "0",
    //         },
    //     })
    //     .then((res)=>{
    //         console.log(values)
    //         dispatch(setToken(res.data.token));
    //         localStorage.setItem("token" ,res.data.token ) 
    //         toast.success(res.data.message)
    //         setTimeout(() => {
    //                 router.push("/")
    //         }, 900);
            
    //     }).catch((error)=>{
    //         console.log(error);
    //         toast.error("Email is required")
    //     }).finally(()=>{
    //         setIslooding(false)
    //     })
        
    // }
    // const validationSchema = YUP.object().shape({
    //     email:YUP.string().email("email is in-valid").required("email is required"),
    //     password:YUP.string().matches(/^\w{8,15}$/ , "password min 8 to 15 letters").required("password is required"),
    // })
   
    // const loginFormik = useFormik<LoginFormValues>({
    //     initialValues:{
    //         email: "",
    //         password:""
    //     },
    //     onSubmit:handleLogin,
    //     validationSchema
    // })

    // if(islooding){
    //     return <h2>Looding</h2>
    // }
    return (
            <form className="flex flex-col" onSubmit={formSubmitHandler}>
                <input className="mb-1 border rounded p-2 bg-white text-xl" 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                />

                <textarea className="mb-4 p-2 lg:text-xl rounded bg-white resize-none" 
                rows={5} 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button  type="submit" className="cursor-pointer w-full text-xl mt-4 text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold m-auto">Edit</button>
            </form>
    )
}
