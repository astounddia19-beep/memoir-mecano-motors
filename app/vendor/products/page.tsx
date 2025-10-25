"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Package } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

export default function VendorProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>(
    mockProducts.filter((p) => p.vendorId === "v1"), // Filter by current vendor
  )
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  })

  const categories = [
    "Filtres",
    "Freinage",
    "Électricité",
    "Lubrifiants",
    "Pneus",
    "Accessoires",
    "Moteur",
    "Suspension",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
            : p,
        ),
      )
      setEditingProduct(null)
    } else {
      // Add new product
      const newProduct: Product = {
        id: `p${Date.now()}`,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: "/generic-auto-part.png",
        vendorId: "v1",
        vendorName: user?.name || "Mon magasin",
        rating: 0,
        reviewCount: 0,
      }
      setProducts([...products, newProduct])
      setIsAddingProduct(false)
    }
    // Reset form
    setFormData({ name: "", description: "", price: "", category: "", brand: "", stock: "" })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      stock: product.stock.toString(),
    })
    setIsAddingProduct(true)
  }

  const handleDelete = (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Mes Produits</h1>
            <p className="text-muted-foreground">Gérez votre catalogue de pièces détachées</p>
          </div>
          <Button onClick={() => setIsAddingProduct(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </div>

        {isAddingProduct && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingProduct ? "Modifier le produit" : "Nouveau produit"}</CardTitle>
              <CardDescription>
                {editingProduct
                  ? "Modifiez les informations du produit"
                  : "Ajoutez un nouveau produit à votre catalogue"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du produit</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Filtre à huile premium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marque</Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Bosch"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Décrivez le produit..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (FCFA)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="15000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingProduct ? "Mettre à jour" : "Ajouter le produit"}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingProduct(false)
                      setEditingProduct(null)
                      setFormData({ name: "", description: "", price: "", category: "", brand: "", stock: "" })
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun produit</h3>
              <p className="text-muted-foreground text-center mb-4">
                Commencez par ajouter votre premier produit à votre catalogue
              </p>
              <Button onClick={() => setIsAddingProduct(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="aspect-square relative mb-4 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prix:</span>
                      <span className="font-semibold">{product.price.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className={product.stock < 10 ? "text-destructive font-semibold" : ""}>
                        {product.stock} unités
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Catégorie:</span>
                      <span>{product.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
