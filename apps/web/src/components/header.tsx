import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { USER_KEY } from "@/utils/constants"

export default function Header() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem(USER_KEY)
    navigate("/login")
  }

  return (
    <header className="bg-emerald-500 h-20 w-full flex justify-between">
      <div className="p-4 w-80 h-full bg-emerald-600 shadow-sm flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          <span className="text-emerald-600 bg-white px-1 rounded-sm">WOO</span>
          <span>BANK</span>
        </h1>
      </div>

      <div className="flex gap-8 items-center justify-center mr-8">
        <LogOut
          className="hover:text-red-500 hover:cursor-pointer transition-all ease-in-out"
          onClick={handleLogout}
        />
      </div>
    </header>
  )
}
