"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, ArrowLeft, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
      toast({
        title: "Email envoyé!",
        description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-xl p-3">
              <Wrench className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Mot de passe oublié?</CardTitle>
          <CardDescription>Entrez votre adresse e-mail pour recevoir un lien de réinitialisation</CardDescription>
        </CardHeader>
        <CardContent>
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ahmadou.diop@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11 rounded-lg shadow-md" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary/10 text-primary p-4 rounded-lg border border-primary/20 text-center">
                <Mail className="h-12 w-12 mx-auto mb-3 text-primary" />
                <p className="font-medium mb-2">Email envoyé avec succès!</p>
                <p className="text-sm">
                  Vérifiez votre boîte de réception à <strong>{email}</strong> pour le lien de réinitialisation.
                </p>
              </div>

              <div className="text-sm text-muted-foreground text-center space-y-2">
                <p>Vous n'avez pas reçu l'email?</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailSent(false)
                    setEmail("")
                  }}
                  className="w-full"
                >
                  Renvoyer l'email
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
