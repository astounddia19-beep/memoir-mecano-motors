"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { MechanicCard } from "@/components/mechanic-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, SlidersHorizontal, Navigation } from "lucide-react"
import { mockMechanics } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useGeolocation, calculateDistance } from "@/lib/geolocation"

export default function MechanicsPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const { location, loading: locationLoading } = useGeolocation()

  const cities = Array.from(new Set(mockMechanics.map((m) => m.city)))
  const allSpecialties = Array.from(new Set(mockMechanics.flatMap((m) => m.specialties)))

  const mechanicsWithDistance = useMemo(() => {
    return mockMechanics.map((mechanic) => ({
      ...mechanic,
      distance: location
        ? calculateDistance(location.latitude, location.longitude, mechanic.latitude, mechanic.longitude)
        : null,
    }))
  }, [location])

  const filteredMechanics = mechanicsWithDistance
    .filter((mechanic) => {
      const matchesSearch =
        mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mechanic.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mechanic.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCity = cityFilter === "all" || mechanic.city === cityFilter
      const matchesSpecialty = specialtyFilter === "all" || mechanic.specialties.includes(specialtyFilter)

      return matchesSearch && matchesCity && matchesSpecialty
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount
      if (sortBy === "price") return a.hourlyRate - b.hourlyRate
      if (sortBy === "experience") return b.experience - a.experience
      if (sortBy === "distance") {
        if (a.distance === null) return 1
        if (b.distance === null) return -1
        return a.distance - b.distance
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && <DashboardHeader />}
      {!isAuthenticated && (
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Mecano Motor's
            </Link>
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>S'inscrire</Button>
              </Link>
            </div>
          </div>
        </header>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Trouver un Mécanicien</h1>
          <p className="text-muted-foreground">Découvrez des professionnels qualifiés près de chez vous</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Card>
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
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger id="city">
                      <SelectValue />
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
                      <SelectValue />
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
                      <SelectItem value="distance" disabled={!location}>
                        Distance {!location && "(Activer la localisation)"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {location && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setSortBy("distance")
                      setCityFilter("all")
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Près de moi
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setCityFilter("all")
                    setSpecialtyFilter("all")
                    setSortBy("rating")
                  }}
                >
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              -{filteredMechanics.length} mécanicien{filteredMechanics.length > 1 ? "s" : ""} trouvé
              -{filteredMechanics.length > 1 ? "s" : ""}
              +{filteredMechanics.length} {filteredMechanics.length > 1 ? "mécaniciens trouvés" : "mécanicien trouvé"}
            </div>

            {filteredMechanics.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aucun mécanicien ne correspond à vos critères.</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setCityFilter("all")
                      setSpecialtyFilter("all")
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMechanics.map((mechanic) => (
                  <MechanicCard key={mechanic.id} mechanic={mechanic} distance={mechanic.distance} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
