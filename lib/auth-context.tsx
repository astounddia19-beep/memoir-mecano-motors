"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  email: string
  name?: string
  role?: "client" | "mechanic" | "vendor" | "admin"
  phone?: string
  address?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  // public API used across the app
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (payload: { firstName: string; lastName: string; email?: string; password: string; role?: User["role"] }) => Promise<void>
  logout: () => Promise<void>
  // backward-compatible names (optional)
  signIn?: (email: string, password: string) => Promise<void>
  signInWithGoogle?: () => Promise<void>
  signOut?: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Hydrate user depuis localStorage pour afficher le dashboard après rechargement
  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("mecano_user")
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          const normalized = {
            ...parsed,
            role: (parsed.role || "client").toLowerCase(),
          }
          setUser(normalized)
        } catch {}
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Validation côté client
      if (!email || !password) {
        throw new Error("Email et mot de passe requis")
      }
      
      if (!email.includes("@")) {
        throw new Error("Format d'email invalide")
      }
      
      if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères")
      }
      
      // Simulation d'appel API
      await new Promise((r) => setTimeout(r, 1000))
      
      // En production, remplacer par un vrai appel API
      const u: User = { 
        id: "u_" + Date.now().toString(), 
        email, 
        name: email.split("@")[0], 
        role: "client" 
      }
      setUser(u)
      
      // Persister en localStorage pour la session
      if (typeof window !== "undefined") {
        localStorage.setItem("mecano_user", JSON.stringify(u))
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 300))
    const u: User = { id: "u_google", email: "google@example.com", name: "Google User", role: "client" }
    setUser(u)
    setIsLoading(false)
  }

  const register = async (payload: { firstName: string; lastName: string; email?: string; password: string; role?: User["role"] }) => {
    setIsLoading(true)
    try {
      // Appel API réel
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors de l'inscription")
      }
      const data = await response.json()
      const u: User = {
        id: data.user.id,
        email: data.user.email || "",
        name: `${payload.firstName} ${payload.lastName}`,
        role: (data.user.role ?? payload.role ?? "client").toLowerCase() as any,
      }
      setUser(u)
      if (typeof window !== "undefined") {
        localStorage.setItem("mecano_user", JSON.stringify(u))
      }
    } catch (error: any) {
      console.error("Erreur d'inscription:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
  }

  // public API: provide both the names used in the app and legacy names
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: signIn,
    loginWithGoogle: signInWithGoogle,
    register,
    logout: signOut,
    // backward compatible aliases
    signIn,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
