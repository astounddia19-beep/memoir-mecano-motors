"use client"

export const dynamic = 'force-dynamic'

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { MechanicCard } from "@/components/mechanic-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, Navigation, Calendar, MessageSquare } from "lucide-react"
import { getMechanics } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useGeolocation, calculateDistance } from "@/lib/geolocation"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Mechanic } from "@/lib/mock-data"

export default function MechanicsPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const { location, loading: locationLoading } = useGeolocation()
  const [mechanics, setMechanics] = useState<Mechanic[]>([])

  useEffect(() => {
    setMechanics(getMechanics())
  }, [])

  const cities = Array.from(new Set(mechanics.map((m) => m.city ?? "Inconnue")))
  const allSpecialties = Array.from(new Set(mechanics.flatMap((m) => m.specialties ?? [])))

  const mechanicsWithDistance = useMemo(() => {
    return mechanics.map((mechanic) => ({
      ...mechanic,
      distance: location
        ? calculateDistance(location.latitude, location.longitude, mechanic.latitude ?? 0, mechanic.longitude ?? 0)
        : null,
    }))
  }, [location, mechanics])

  const filteredMechanics = mechanicsWithDistance
    .filter((mechanic) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        (mechanic.name ?? "").toLowerCase().includes(q) ||
        (mechanic.city ?? "").toLowerCase().includes(q) ||
        (mechanic.description ?? "").toLowerCase().includes(q) ||
        (mechanic.specialties ?? []).some((s: string) => s.toLowerCase().includes(q))

      const matchesCity = cityFilter === "all" || (mechanic.city ?? "") === cityFilter
      const matchesSpecialty = specialtyFilter === "all" || (mechanic.specialties ?? []).includes(specialtyFilter)

      return matchesSearch && matchesCity && matchesSpecialty
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0)
      if (sortBy === "reviews") return (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
      if (sortBy === "price") return (a.hourlyRate ?? Number.POSITIVE_INFINITY) - (b.hourlyRate ?? Number.POSITIVE_INFINITY)
      if (sortBy === "experience") return (b.experience ?? 0) - (a.experience ?? 0)
      if (sortBy === "distance") {
        if (a.distance === null) return 1
        if (b.distance === null) return -1
        return (a.distance ?? 0) - (b.distance ?? 0)
      }
      return 0
    })

  const handleDemandService = (mechanicId: string) => {
    router.push(`/reservations/new?mechanicId=${mechanicId}&type=immediate`)
  }

  const handleTakeAppointment = (mechanicId: string) => {
    router.push(`/reservations/new?mechanicId=${mechanicId}&type=appointment`)
  }

  const handleSendMessage = (mechanicId: string) => {
    router.push(`/messages?mechanicId=${mechanicId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && <DashboardHeader />}
      {!isAuthenticated && (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold">Mécaniciens</h1>
          </div>
        </header>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Trouvez un mécanicien</h1>
          <p className="text-muted-foreground">Recherchez et filtrez les mécaniciens selon vos besoins</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filtres sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Rechercher</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Nom, ville, spécialité..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Toutes les villes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Spécialité</Label>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Toutes les spécialités" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les spécialités</SelectItem>
                      {allSpecialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort">Trier par</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Note</SelectItem>
                      <SelectItem value="reviews">Nombre d'avis</SelectItem>
                      <SelectItem value="price">Prix</SelectItem>
                      <SelectItem value="experience">Expérience</SelectItem>
                      {location && <SelectItem value="distance">Distance</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>

                {(cityFilter !== "all" || specialtyFilter !== "all" || searchQuery) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setCityFilter("all")
                      setSpecialtyFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Liste des mécaniciens */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredMechanics.length} {filteredMechanics.length > 1 ? "mécaniciens trouvés" : "mécanicien trouvé"}
              </div>
            </div>

            {filteredMechanics.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aucun mécanicien trouvé avec ces critères.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setCityFilter("all")
                      setSpecialtyFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredMechanics.map((mechanic) => (
                  <Card key={mechanic.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      {/* Photo du garage */}
                      <div className="md:w-64 h-48 md:h-auto relative bg-muted flex-shrink-0">
                        <Image
                          src={mechanic.image || "/placeholder.svg"}
                          alt={mechanic.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 256px"
                          priority={false}
                        />
                        {mechanic.distance !== null && mechanic.distance !== undefined && (
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            {mechanic.distance < 1
                              ? `${Math.round(mechanic.distance * 1000)} m`
                              : `${mechanic.distance.toFixed(1)} km`}
                          </Badge>
                        )}
                      </div>

                      {/* Informations */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{mechanic.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Navigation className="h-3 w-3" />
                              {mechanic.city} - {mechanic.address}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-lg font-semibold mb-1">
                              ⭐ {mechanic.rating?.toFixed(1)}
                              <span className="text-sm text-muted-foreground font-normal">
                                ({mechanic.reviewCount})
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{mechanic.experience} ans d'expérience</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{mechanic.description}</p>

                        {/* Spécialités */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {mechanic.specialties?.slice(0, 4).map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                          {mechanic.specialties && mechanic.specialties.length > 4 && (
                            <Badge variant="secondary">+{mechanic.specialties.length - 4}</Badge>
                          )}
                        </div>

                        {/* Tarif */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold">
                            Tarif horaire : {mechanic.hourlyRate?.toLocaleString()} FCFA/h
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendMessage(mechanic.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contacter
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDemandService(mechanic.id)}
                          >
                            Service immédiat
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleTakeAppointment(mechanic.id)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Prendre rendez-vous
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
