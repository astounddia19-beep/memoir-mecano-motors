"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Wrench, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "client",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setIsLoading(true)

    try {
      await register(formData.email, formData.password, formData.name, formData.role, formData.phone)
      router.push("/dashboard")
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-xl p-3">
              <Wrench className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
          <CardDescription>Créez votre compte pour rejoindre Mecano Motor's</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ahmadou Diop"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmadou.diop@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="77 123 45 67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Type de compte</Label>
              <RadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="client" id="client" />
                  <Label htmlFor="client" className="font-normal cursor-pointer flex-1">
                    Client - Je cherche des services automobiles
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="mechanic" id="mechanic" />
                  <Label htmlFor="mechanic" className="font-normal cursor-pointer flex-1">
                    Mécanicien - Je propose mes services
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="vendor" id="vendor" />
                  <Label htmlFor="vendor" className="font-normal cursor-pointer flex-1">
                    Vendeur - Je vends des pièces détachées
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 rounded-lg shadow-md" disabled={isLoading}>
              {isLoading ? "Création..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Déjà un compte?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Retour à l'accueil
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
