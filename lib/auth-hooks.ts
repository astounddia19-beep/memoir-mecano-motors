"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error("Identifiants invalides")
    }

    return result
  }

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" })
  }

  const logout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    role?: string
  }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erreur lors de l'inscription")
    }

    // Auto-login after registration
    await login(userData.email, userData.password)
  }

  return {
    user: session?.user || null,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    login,
    loginWithGoogle,
    logout,
    register,
  }
}

