"use client"

export const dynamic = 'force-dynamic'

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MechanicProfilePage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    specialties: "",
    experience: "",
    description: "",
    hourlyRate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save profile data
    localStorage.setItem(`mechanic_profile_${user?.id}`, JSON.stringify(formData))
    alert("Profil mis à jour avec succès!")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Mon profil mécanicien</h2>
          <p className="text-muted-foreground">Mettez à jour vos informations professionnelles</p>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Informations du profil</CardTitle>
            <CardDescription>Ces informations seront visibles par les clients</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+221 XX XXX XX XX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: Dakar"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse du garage *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ex: Rue 10, Quartier Liberté 6"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties">Spécialités *</Label>
                <Input
                  id="specialties"
                  required
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  placeholder="Ex: Mécanique générale, Électricité auto, Climatisation"
                />
                <p className="text-xs text-muted-foreground">Séparez les spécialités par des virgules</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Années d'expérience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Ex: 10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Tarif horaire (FCFA) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    placeholder="Ex: 5000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description du garage *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Présentez votre garage et vos services..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Enregistrer les modifications
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
