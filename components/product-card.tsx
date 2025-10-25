"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/shop/${product.id}`}>
        <div className="aspect-square relative bg-muted">
          <Image 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            fill 
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock < 10 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">Stock limité</Badge>
          )}
        </div>
      </Link>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Link href={`/shop/${product.id}`}>
              <CardTitle className="text-lg hover:text-primary transition-colors">{product.name}</CardTitle>
            </Link>
            <CardDescription className="mt-1">{product.brand}</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold text-sm">{product.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">{product.price.toLocaleString()} FCFA</p>
            <p className="text-xs text-muted-foreground">{product.stock} en stock</p>
          </div>
          <Button onClick={handleAddToCart} size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
