"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, MapPin, Phone, User } from "lucide-react"
import { mockMechanics } from "@/lib/mock-data"

export default function ReservationsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"all">("all")
  const [reservations, setReservations] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      // Récupérer les réservations depuis le localStorage
      const reservationsKey = `mecano_reservations_${user.id}`
      const storedReservations = localStorage.getItem(reservationsKey)
      if (storedReservations) {
        setReservations(JSON.parse(storedReservations))
      }
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!user) return null

  const filteredReservations = reservations.filter((reservation) => {
    if (activeTab === "all") return true
    return reservation.status === activeTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Confirmée</Badge>
      case "completed":
        return <Badge className="bg-blue-500 text-white">Terminée</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMechanicInfo = (mechanicId: string) => {
    return mockMechanics.find((m) => m.id === mechanicId)
  }

  const handleCancel = (id: string) => {
    const reason = window.prompt('Motif d\'annulation (facultatif) :')
    if (reason === null) return // annulation de la prompt
    setReservations(prev => {
      const next = prev.map(r => r.id === id ? { ...r, status: 'cancelled', cancelledAt: new Date().toISOString(), cancelReason: reason } : r)
      const key = `mecano_reservations_${user.id}`
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mes Réservations</h1>
            <p className="text-muted-foreground">Gérez vos rendez-vous avec les mécaniciens</p>
          </div>
          <Link href="/reservations/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle réservation
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all")} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="all">Toutes ({reservations.length})</TabsTrigger>
            <TabsTrigger value="pending">En attente ({reservations.filter(r => r.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmées ({reservations.filter(r => r.status === "confirmed").length})</TabsTrigger>
            <TabsTrigger value="completed">Terminées ({reservations.filter(r => r.status === "completed").length})</TabsTrigger>
            <TabsTrigger value="cancelled">Annulées ({reservations.filter(r => r.status === "cancelled").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredReservations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Aucune réservation</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {activeTab === "all" 
                      ? "Vous n'avez pas encore de réservations. Trouvez un mécanicien près de chez vous et prenez votre premier rendez-vous."
                      : `Aucune réservation ${activeTab === "pending" ? "en attente" : activeTab === "confirmed" ? "confirmée" : activeTab === "completed" ? "terminée" : "annulée"}.`
                    }
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/mechanics">
                      <Button variant="outline">Trouver un mécanicien</Button>
                    </Link>
                    <Link href="/reservations/new">
                      <Button>Créer une réservation</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredReservations.map((reservation) => {
                  const mechanic = getMechanicInfo(reservation.mechanicId)
                  return (
                    <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{reservation.service}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <User className="h-4 w-4" />
                              {mechanic?.name || "Mécanicien"}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(reservation.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-medium">Date:</span>
                              <span>{new Date(reservation.date).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">Heure:</span>
                              <span>{reservation.time}</span>
                            </div>
                            {mechanic && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="font-medium">Adresse:</span>
                                <span>{mechanic.address}, {mechanic.city}</span>
                              </div>
                            )}
                            {mechanic && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-primary" />
                                <span className="font-medium">Téléphone:</span>
                                <span>{mechanic.phone}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-medium">Véhicule:</span>
                              <p className="text-muted-foreground">
                                {reservation.vehicleInfo?.make} {reservation.vehicleInfo?.model} ({reservation.vehicleInfo?.year})
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Plaque: {reservation.vehicleInfo?.plate}
                              </p>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Durée estimée:</span>
                              <p className="text-muted-foreground">{reservation.estimatedDuration} minutes</p>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Prix estimé:</span>
                              <p className="text-muted-foreground font-semibold">{reservation.estimatedPrice?.toLocaleString()} FCFA</p>
                            </div>
                          </div>
                        </div>
                        
                        {reservation.notes && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Notes:</p>
                            <p className="text-sm text-muted-foreground">{reservation.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          {reservation.status === "pending" && (
                            <Button variant="destructive" size="sm" onClick={() => handleCancel(reservation.id)}>
                              Annuler
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
