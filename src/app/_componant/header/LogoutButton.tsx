"use client"

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";

export default function LogoutButton() {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/")
      router.refresh()
    } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
    toast.warning("Something went wrong")
}
    }
  }
  return (
    <button onClick={logoutHandler} className="bg-gray-700 text-gray-200 px-2 py-1 rounded-lg">
      Logout
    </button>
  )
}
