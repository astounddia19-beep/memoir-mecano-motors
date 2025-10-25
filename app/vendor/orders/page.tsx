"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/types"

export default function VendorOrdersPage() {
  // Mock orders for vendor
  const [orders] = useState<Order[]>([
    {
      id: "ord1",
      clientId: "c1",
      clientName: "Sophie Laurent",
      items: [
        {
          product: {
            id: "1",
            name: "Filtre à huile premium",
            price: 7500,
            category: "Filtres",
            brand: "Bosch",
            description: "",
            image: "",
            stock: 45,
            vendorId: "v1",
            vendorName: "Pièces Auto Pro",
            rating: 4.7,
            reviewCount: 89,
          },
          quantity: 2,
        },
      ],
      total: 15000,
      status: "pending",
      shippingAddress: "Dakar, Plateau",
      paymentMethod: "wave",
      createdAt: "2025-01-15T10:30:00Z",
    },
    {
      id: "ord2",
      clientId: "c2",
      clientName: "Marc Diop",
      items: [
        {
          product: {
            id: "2",
            name: "Plaquettes de frein avant",
            price: 28000,
            category: "Freinage",
            brand: "Brembo",
            description: "",
            image: "",
            stock: 28,
            vendorId: "v1",
            vendorName: "Pièces Auto Pro",
            rating: 4.9,
            reviewCount: 156,
          },
          quantity: 1,
        },
      ],
      total: 28000,
      status: "processing",
      shippingAddress: "Pikine, Icotaf",
      paymentMethod: "orange-money",
      createdAt: "2025-01-14T14:20:00Z",
    },
  ])

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "processing":
        return "En préparation"
      case "shipped":
        return "Expédiée"
      case "delivered":
        return "Livrée"
      case "cancelled":
        return "Annulée"
    }
  }

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Mes Commandes</h1>
          <p className="text-muted-foreground">Gérez les commandes de vos clients</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
              <p className="text-muted-foreground text-center">Les commandes de vos clients apparaîtront ici</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                      <CardDescription>
                        Client: {order.clientName} • {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusVariant(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Articles commandés:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.product.name} x {item.quantity}
                            </span>
                            <span className="font-semibold">
                              {(item.product.price * item.quantity).toLocaleString()} FCFA
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Adresse de livraison:</span>
                        <span>{order.shippingAddress}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Mode de paiement:</span>
                        <span className="capitalize">{order.paymentMethod?.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{order.total.toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Select defaultValue={order.status}>
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="processing">En préparation</SelectItem>
                          <SelectItem value="shipped">Expédiée</SelectItem>
                          <SelectItem value="delivered">Livrée</SelectItem>
                          <SelectItem value="cancelled">Annulée</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>Mettre à jour</Button>
                    </div>
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
