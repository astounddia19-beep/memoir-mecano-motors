import { notFound } from "next/navigation"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Phone, Mail, Clock, Euro, Calendar } from "lucide-react"
import { mockMechanics, mockReviews } from "@/lib/mock-data"
import Image from "next/image"

export default async function MechanicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mechanic = mockMechanics.find((m) => m.id === id)

  if (!mechanic) {
    notFound()
  }

  const reviews = mockReviews.filter((r) => r.mechanicId === mechanic.id)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/mechanics">
            <Button variant="ghost" className="mb-4 bg-transparent">
              ← Retour à la liste
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="aspect-video relative bg-muted">
                <Image src={mechanic.image || "/placeholder.svg"} alt={mechanic.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{mechanic.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <MapPin className="h-4 w-4" />
                      {mechanic.address}, {mechanic.city}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 bg-accent text-accent-foreground px-3 py-2 rounded-lg">
                    <Star className="h-5 w-5 fill-current" />
                    <div className="flex flex-col">
                      <span className="font-bold text-lg leading-none">{mechanic.rating}</span>
                      <span className="text-xs">({mechanic.reviewCount} avis)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">À propos</h3>
                  <p className="text-muted-foreground">{mechanic.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Spécialités</h3>
                  <div className="flex flex-wrap gap-2">
                    {mechanic.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expérience</p>
                      <p className="font-semibold text-foreground">{mechanic.experience} ans</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Euro className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tarif horaire</p>
                      <p className="font-semibold text-foreground">{mechanic.hourlyRate.toLocaleString()} FCFA/h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Avis clients</CardTitle>
                    <CardDescription>{reviews.length} avis vérifiés</CardDescription>
                  </div>
                  <Link href={`/reviews/new?mechanicId=${mechanic.id}`}>
                    <Button size="sm">Laisser un avis</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Aucun avis pour le moment</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {review.clientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{review.clientName}</p>
                            <p className="text-sm text-muted-foreground">{review.service}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Téléphone</p>
                    <p className="font-medium text-foreground">{mechanic.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground break-all">{mechanic.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-muted-foreground mb-1">Disponibilités</p>
                    <div className="flex flex-wrap gap-1">
                      {mechanic.availability.map((day) => (
                        <Badge key={day} variant="outline" className="text-xs">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Link href={`/reservations/new?mechanicId=${mechanic.id}`}>
                    <Button className="w-full">Réserver un rendez-vous</Button>
                  </Link>
                  <Link href={`/messages?mechanicId=${mechanic.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Envoyer un message
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
