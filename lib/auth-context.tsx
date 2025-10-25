"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, AuthState } from "./types"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role: string, phone?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("mecano_user")
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      })
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role: "client",
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("mecano_user", JSON.stringify(mockUser))
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const register = async (email: string, password: string, name: string, role: string, phone?: string) => {
    // Mock registration - in production, this would call your API
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: role as User["role"],
      phone,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("mecano_user", JSON.stringify(newUser))
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const logout = () => {
    localStorage.removeItem("mecano_user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
