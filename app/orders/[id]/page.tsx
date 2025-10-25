"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  ArrowLeft,
  MessageSquare,
  RefreshCw,
  Download,
  Share
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  clientId: string
  clientName: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod?: "wave" | "orange-money" | "free-money" | "card" | "cash"
  createdAt: string
  estimatedDelivery?: string
  trackingNumber?: string
  notes?: string
}

interface OrderTimeline {
  status: string
  date: string
  description: string
  completed: boolean
}

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    const loadOrder = async () => {
      if (user) {
        const { id } = await params
        const ordersKey = `mecano_orders_${user.id}`
        const storedOrders = localStorage.getItem(ordersKey)
        if (storedOrders) {
          const orders = JSON.parse(storedOrders)
          const foundOrder = orders.find((o: Order) => o.id === id)
          if (foundOrder) {
            setOrder(foundOrder)
          }
        }
        setLoading(false)
      }
    }
    loadOrder()
  }, [user, params, router])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <p className="text-muted-foreground">Chargement de la commande...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Commande introuvable</h3>
              <p className="text-muted-foreground mb-6">
                Cette commande n'existe pas ou vous n'avez pas l'autorisation de la consulter.
              </p>
              <Link href="/orders">
                <Button>Retour aux commandes</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">En cours de traitement</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Expédiée</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Livrée</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethodText = (method?: string) => {
    switch (method) {
      case "wave":
        return "Wave"
      case "orange-money":
        return "Orange Money"
      case "free-money":
        return "Free Money"
      case "card":
        return "Carte bancaire"
      case "cash":
        return "Espèces"
      default:
        return "Non spécifié"
    }
  }

  const getOrderTimeline = (order: Order): OrderTimeline[] => {
    const timeline: OrderTimeline[] = [
      {
        status: "pending",
        date: order.createdAt,
        description: "Commande passée",
        completed: true
      }
    ]

    if (order.status !== "pending") {
      timeline.push({
        status: "processing",
        date: order.createdAt,
        description: "Commande en cours de traitement",
        completed: order.status === "processing" || order.status === "shipped" || order.status === "delivered"
      })
    }

    if (order.status === "shipped" || order.status === "delivered") {
      timeline.push({
        status: "shipped",
        date: order.createdAt,
        description: "Commande expédiée",
        completed: true
      })
    }

    if (order.status === "delivered") {
      timeline.push({
        status: "delivered",
        date: order.createdAt,
        description: "Commande livrée",
        completed: true
      })
    }

    return timeline
  }

  const timeline = getOrderTimeline(order)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/orders">
            <Button variant="ghost" className="mb-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux commandes
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Commande #{order.id}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      Passée le {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Articles commandés */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Articles commandés</h4>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-foreground">{item.productName}</h5>
                          <p className="text-sm text-muted-foreground">
                            Quantité: {item.quantity} × {item.price.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground text-lg">
                            {(item.quantity * item.price).toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline de la commande */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Suivi de la commande</h4>
                  <div className="space-y-4">
                    {timeline.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{step.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(step.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations de livraison et paiement */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Adresse de livraison</p>
                    <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                  </div>
                </div>
                
                {order.estimatedDelivery && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Livraison estimée</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.estimatedDelivery).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                )}

                {order.trackingNumber && (
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Numéro de suivi</p>
                      <p className="text-sm text-muted-foreground font-mono">{order.trackingNumber}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations de paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">Méthode de paiement</p>
                  <p className="text-sm text-muted-foreground">
                    {getPaymentMethodText(order.paymentMethod)}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Total de la commande</p>
                  <p className="text-2xl font-bold text-foreground">
                    {order.total.toLocaleString()} FCFA
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contacter le support
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger la facture
                </Button>
                <Button className="w-full" variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Partager la commande
                </Button>
              </CardContent>
            </Card>

            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Note de la commande</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}


