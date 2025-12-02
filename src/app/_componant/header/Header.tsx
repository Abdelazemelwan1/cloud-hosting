
 import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";


export default async function Header() {
  const token = cookies().get("jwtToken")?.value || "";
    const payload = verifyTokenForPage(token)

  return (<>
    <header  className="relative h-[100px] flex items-center justify-between px-10 border-b-4 border-[rgb(144 , 144 , 144)] bg-[rgb(227,225,225)]">
        <Navbar isAdmin={payload?.isAdmin || false}/>
        <div className="flex items-center gap-2.5">
          {payload ? (<>
            <strong className="text-blue-800 md:text-xl capitalize">
              {payload?.username}
            </strong>
            <LogoutButton/>
          </>) : (<>
            <Link className="cursor-pointer bg-blue-600 text-white rounded-2xl py-2 px-3 text-xl font-semibold flex items-center hover:bg-blue-800" 
            href="/login">Login</Link>
            <Link className="cursor-pointer bg-blue-600 text-white rounded-2xl py-2 px-3 text-xl font-semibold flex items-center hover:bg-blue-800" href="/register">Register</Link>
          </>)}

        </div>
    </header>
  </>)
}
