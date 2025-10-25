"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, SlidersHorizontal } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

export default function ShopPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = Array.from(new Set(mockProducts.map((p) => p.category)))
  const brands = Array.from(new Set(mockProducts.map((p) => p.brand)))

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesBrand = brandFilter === "all" || product.brand === brandFilter

      return matchesSearch && matchesCategory && matchesBrand
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Boutique de Pièces</h1>
          <p className="text-muted-foreground">Trouvez les pièces détachées dont vous avez besoin</p>
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
                      placeholder="Nom, marque..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger id="brand">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les marques</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
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
                      <SelectItem value="name">Nom</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="rating">Note</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("all")
                    setBrandFilter("all")
                    setSortBy("name")
                  }}
                >
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé
              {filteredProducts.length > 1 ? "s" : ""}
            </div>

            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("all")
                      setBrandFilter("all")
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
