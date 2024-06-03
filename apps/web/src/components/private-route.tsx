import { Navigate } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"
import AppLayout from "@/layouts/AppLayout"

type Props = {
  children: React.ReactNode
}

export function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <AppLayout>{children}</AppLayout>
}
