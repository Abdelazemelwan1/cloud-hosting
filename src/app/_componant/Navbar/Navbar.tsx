"use client"
import Link from 'next/link'
import { useState } from 'react';
import { GrTechnology } from "react-icons/gr";
import { IoCloseSharp, IoMenu } from 'react-icons/io5';

interface NavbarProps {
    isAdmin : boolean;
}


export default function Navbar({isAdmin} : NavbarProps) {
const [toggle, setToggle] = useState<boolean>(false);

    
  return (
       <nav className="flex items-center justify-between">
            <div className="flex ">
                <Link className="hidden lg:flex items-center text-2xl font-bold text-[rgb(176,15,176)]" href="/">CLOUD <GrTechnology /> HOSTING</Link>
                <div onClick={() => setToggle(!toggle)} className='text-5xl font-bold text-[#202121] cursor-pointer flex lg:hidden transition-all duration-500 ease-in'>
                    {toggle == true ? <IoCloseSharp /> : <IoMenu />}
                </div>
            </div>
            <div  className={`max-lg:absolute max-lg:-left-full ${toggle == true ? "max-lg:left-0 " : ""} max-lg:top-full max-lg:w-full  max-lg:transition-all max-lg:duration-500 max-lg:ease-in max-lg:z-10 max-lg:bg-[rgb(227,225,225)]`}>
                <ul onClick={() => setToggle(false)} className="ml-[30px]  max-lg:flex max-lg:flex-col max-lg:gap-4 pb-3.5">
                    <Link className="text-xl font-semibold mx-3 my-0 hover:text-blue-800" href="/">Home</Link>
                    <Link className="text-xl font-semibold mx-3 my-0 hover:text-blue-800" href="/articles?pageNumber=1">Articles</Link>
                    <Link className="text-xl font-semibold mx-3 my-0 hover:text-blue-800" href="/about">About</Link>
                    {isAdmin && (
                        <Link className="text-xl font-semibold mx-3 my-0 hover:text-blue-800" href="/admin">Admin Dashboard</Link>
                    ) }
                </ul>
            </div>
        </nav>
  )
}
