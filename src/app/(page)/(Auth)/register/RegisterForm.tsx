"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
// import { BarLoader } from 'react-spinners';

import { BiLoader } from "react-icons/bi";
import { DOMAIN } from "@/utils/constants";


export default function RegisterForm() {


    const router = useRouter();
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
        const [password , setPassword] = useState("")
    const [islooding, setIslooding] = useState<boolean>(false)

    // const dispatch = useDispatch();


    const formSubmitHandler = async(e:React.FormEvent) => {
        e.preventDefault();
        if(username === "") return toast.error("Username is required")
        if(email === "") return toast.error("email is required")
        if(password === "") return toast.error("password is required")

        try {
            setIslooding(true)
            await axios.post(`${DOMAIN}/api/users/register` , {email , password , username})
            router.replace("/")
            router.refresh()
            setIslooding(false)
        } catch (error) {
            toast.error(error?.response?.data.message)
            console.log(error);
            setIslooding(false)

            
        }
    }


    // function handleLogin(values : LoginFormValues) {
    //     setIslooding(true)
    //     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
    //     .then((res)=>{
    //         console.log(values)
    //         dispatch(setToken(res.data.token));
    //         localStorage.setItem("token" ,res.data.token ) 
    //         toast.success(res.data.message)
    //         setTimeout(() => {
    //                 router.push("/login")
    //         }, 900);
            
    //     }).catch((error)=>{
    //         console.log(error);
    //         toast.error("Email is required")
    //     }).finally(()=>{
    //         setIslooding(false)
    //     })
        
    // }
    // const validationSchema = YUP.object().shape({
    //     name: YUP.string().min(3, "name min 3 char").max(15, "name max 15 char").required("name is required"),
    //     email:YUP.string().email("email is in-valid").required("email is required"),
    //     password:YUP.string().matches(/^\w{8,15}$/ , "password min 8 to 15 letters").required("password is required"),
    //     rePassword:YUP.string().oneOf([YUP.ref("password")] , "password and repassword dont match").required("rePassword is required"),
    //     phone:YUP.string().matches(/^01[0125][0-9]{8}$/ , "phone must be egyption number").required("phone is required")
    // })
   
    // const loginFormik = useFormik({
    //     initialValues:{
    //         name: "",
    //         email:"",
    //         password:"",
    //         rePassword:"",
    //         phone:""
    //     },
    //     onSubmit:handleLogin,
    //     validationSchema
    // })

    // if(islooding){
    //     return <h2>Looding</h2>
    // }
    return (
            <form className="flex flex-col" onSubmit={formSubmitHandler}>
                <input className="mb-1 mt-3  border rounded p-2  text-xl" 
                placeholder="Enter You name" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} />
                
                <input className="mb-1 mt-3  border rounded p-2  text-xl" 
                placeholder="Enter You Email" 
                type="email" 
                value={email} 
                 onChange={(e) => setEmail(e.target.value)} />
                
                <input className="mb-1 mt-3  border rounded p-2  text-xl" 
                placeholder="Enter You password" 
                type="password" 
                value={password} 
                 onChange={(e) => setPassword(e.target.value)} />
                
               
                <button disabled={islooding ? true : false} type="submit" className="cursor-pointer w-full text-xl mt-4 text-white bg-blue-800 p-2 rounded-lg font-bold m-auto">{islooding ? <BiLoader className="m-auto" />:"Register"}</button>
            </form>
    )
}
