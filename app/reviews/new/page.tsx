"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { mockMechanics } from "@/lib/mock-data"

export default function NewReviewPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mechanicId = searchParams.get("mechanicId")

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!user || !mechanicId) {
    router.push("/mechanics")
    return null
  }

  const mechanic = mockMechanics.find((m) => m.id === mechanicId)

  if (!mechanic) {
    router.push("/mechanics")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Review submitted:", { mechanicId, rating, comment })

    router.push(`/mechanics/${mechanicId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href={`/mechanics/${mechanicId}`}>
              <Button variant="ghost" className="mb-4 bg-transparent">
                ← Retour au profil
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Laisser un avis</h1>
            <p className="text-muted-foreground">Partagez votre expérience avec {mechanic.name}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Votre évaluation</CardTitle>
                <CardDescription>Notez votre expérience et laissez un commentaire</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Note *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-10 w-10 ${
                            star <= (hoveredRating || rating)
                              ? "fill-accent text-accent"
                              : "fill-none text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {rating === 1 && "Très insatisfait"}
                      {rating === 2 && "Insatisfait"}
                      {rating === 3 && "Correct"}
                      {rating === 4 && "Satisfait"}
                      {rating === 5 && "Très satisfait"}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="comment">Votre commentaire *</Label>
                  <Textarea
                    id="comment"
                    placeholder="Décrivez votre expérience avec ce mécanicien..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Partagez des détails sur la qualité du service, la communication, les délais, etc.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={rating === 0 || !comment.trim() || isSubmitting}>
                    {isSubmitting ? "Envoi..." : "Publier l'avis"}
                  </Button>
                  <Link href={`/mechanics/${mechanicId}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Annuler
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
