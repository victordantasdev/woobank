import { ArrowRightLeft, FileClock } from "lucide-react"

import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

const menuItems = [
  {
    name: "Extrato e Transações",
    path: "/",
    icon: <ArrowRightLeft />,
  },
  {
    name: "Fluxo de Caixa",
    path: "/ledger",
    icon: <FileClock />,
  },
]

export default function SideBar() {
  const navigate = useNavigate()

  return (
    <aside className="bg-emerald-600 h-dvh w-80 fixed">
      <ul>
        {menuItems.map((item) => (
          <li
            key={Math.random()}
            className={cn(
              "p-4 text-xl hover:bg-emerald-700 hover:cursor-pointer",
              window.location.pathname === item.path
                ? "bg-emerald-800 hover:bg-emerald-900"
                : ""
            )}
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-center gap-2 ">
              {item.icon}
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
