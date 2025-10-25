"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem("vendor_products") || "[]")

    // Create new product
    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    localStorage.setItem("vendor_products", JSON.stringify([...existingProducts, newProduct]))

    // Redirect to products page
    router.push("/vendor/products")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/vendor/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Button>
          </Link>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Ajouter un nouveau produit</CardTitle>
            <CardDescription>Remplissez les informations du produit</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Filtre à huile Bosch"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    required
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Filtres">Filtres</SelectItem>
                      <SelectItem value="Freinage">Freinage</SelectItem>
                      <SelectItem value="Moteur">Moteur</SelectItem>
                      <SelectItem value="Électricité">Électricité</SelectItem>
                      <SelectItem value="Suspension">Suspension</SelectItem>
                      <SelectItem value="Transmission">Transmission</SelectItem>
                      <SelectItem value="Carrosserie">Carrosserie</SelectItem>
                      <SelectItem value="Accessoires">Accessoires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marque *</Label>
                  <Input
                    id="brand"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Ex: Bosch, Valeo"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ex: 15000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="Ex: 50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez le produit en détail..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Ajouter le produit
                </Button>
                <Link href="/vendor/products" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Annuler
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
