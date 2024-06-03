import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center gap-4 h-dvh">
      <h1 className="text-5xl font-bold">WOOPS...</h1>
      <h2 className="text-3xl">Página não encontrada</h2>

      <Button
        onClick={() => navigate("/")}
        variant="default"
        className="bg-emerald-700 text-white hover:bg-emerald-800"
      >
        Voltar para o início
      </Button>
    </main>
  )
}
