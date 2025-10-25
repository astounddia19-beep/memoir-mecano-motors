"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { mockMechanics } from "@/lib/mock-data"
import Link from "next/link"

export default function NewReservationPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mechanicId = searchParams.get("mechanicId")

  const [formData, setFormData] = useState({
    mechanicId: mechanicId || "",
    service: "",
    date: "",
    time: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehiclePlate: "",
    notes: "",
  })
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

  if (!user) return null

  const selectedMechanic = mockMechanics.find((m) => m.id === formData.mechanicId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!user) return

      // Create reservation object
      const reservation = {
        id: Math.random().toString(36).substr(2, 9),
        clientId: user.id,
        clientName: user.name,
        mechanicId: formData.mechanicId,
        mechanicName: selectedMechanic?.name || "Mécanicien",
        service: formData.service,
        date: formData.date,
        time: formData.time,
        status: "pending",
        notes: formData.notes,
        vehicleInfo: {
          make: formData.vehicleMake,
          model: formData.vehicleModel,
          year: parseInt(formData.vehicleYear),
          plate: formData.vehiclePlate,
        },
        estimatedDuration: 60, // Default 1 hour
        estimatedPrice: selectedMechanic ? selectedMechanic.hourlyRate : 5000,
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      const reservationsKey = `mecano_reservations_${user.id}`
      const existingReservations = localStorage.getItem(reservationsKey)
      const reservations = existingReservations ? JSON.parse(existingReservations) : []
      reservations.unshift(reservation)
      localStorage.setItem(reservationsKey, JSON.stringify(reservations))

      console.log("Réservation créée:", reservation)

      // Redirect to reservations page
      router.push("/reservations")
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    "Vidange moteur",
    "Révision complète",
    "Changement de freins",
    "Changement de pneus",
    "Diagnostic électronique",
    "Réparation moteur",
    "Climatisation",
    "Contrôle technique",
    "Autre",
  ]

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/reservations">
              <Button variant="ghost" className="mb-4 bg-transparent">
                ← Retour aux réservations
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Nouvelle Réservation</h1>
            <p className="text-muted-foreground">Réservez un rendez-vous avec un mécanicien</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du service</CardTitle>
                  <CardDescription>Sélectionnez le mécanicien et le type de service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mechanic">Mécanicien *</Label>
                    <Select
                      value={formData.mechanicId}
                      onValueChange={(value) => setFormData({ ...formData, mechanicId: value })}
                      required
                    >
                      <SelectTrigger id="mechanic">
                        <SelectValue placeholder="Choisir un mécanicien" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockMechanics.map((mechanic) => (
                          <SelectItem key={mechanic.id} value={mechanic.id}>
                            {mechanic.name} - {mechanic.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedMechanic && (
                      <p className="text-sm text-muted-foreground">
                        Tarif: {selectedMechanic.hourlyRate.toLocaleString()} FCFA/h - Spécialités:{" "}
                        {selectedMechanic.specialties.slice(0, 3).join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Type de service *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                      required
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Choisir un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Heure *</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => setFormData({ ...formData, time: value })}
                        required
                      >
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Choisir une heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations du véhicule</CardTitle>
                  <CardDescription>Renseignez les détails de votre véhicule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="make">Marque *</Label>
                      <Input
                        id="make"
                        placeholder="Renault, Peugeot, etc."
                        value={formData.vehicleMake}
                        onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Modèle *</Label>
                      <Input
                        id="model"
                        placeholder="Clio, 308, etc."
                        value={formData.vehicleModel}
                        onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Année *</Label>
                      <Input
                        id="year"
                        type="number"
                        placeholder="2020"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        value={formData.vehicleYear}
                        onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plate">Immatriculation *</Label>
                      <Input
                        id="plate"
                        placeholder="AB-123-CD"
                        value={formData.vehiclePlate}
                        onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notes additionnelles</CardTitle>
                  <CardDescription>Informations complémentaires pour le mécanicien (optionnel)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Décrivez les symptômes, demandes spécifiques, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  <Calendar className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Création..." : "Créer la réservation"}
                </Button>
                <Link href="/reservations" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Annuler
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
