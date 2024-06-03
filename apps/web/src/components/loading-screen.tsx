import { Loader } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <Loader className="animate-spin-slow" />
    </div>
  )
}
