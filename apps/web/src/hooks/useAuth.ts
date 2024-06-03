import { USER_KEY } from "@/utils/constants"

export type User = {
  _id: string
  firstName: string
  email: string
  taxId: string
}

export function useAuth(): { user: User | null; isAuthenticated: boolean } {
  const user = localStorage.getItem(USER_KEY)
  if (!user) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }

  return {
    user: JSON.parse(user),
    isAuthenticated: true,
  }
}
