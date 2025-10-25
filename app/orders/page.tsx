"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  Eye,
  MessageSquare,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

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

export default function OrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"all">("all")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      // Récupérer les commandes depuis le localStorage
      const ordersKey = `mecano_orders_${user.id}`
      const storedOrders = localStorage.getItem(ordersKey)
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      }
      setLoading(false)
    }
  }, [user])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <p className="text-muted-foreground">Chargement de vos commandes...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

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

  const getStatusIcon = (status: string) => {
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
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "pending":
        return "Votre commande est en attente de traitement"
      case "processing":
        return "Votre commande est en cours de préparation"
      case "shipped":
        return "Votre commande a été expédiée"
      case "delivered":
        return "Votre commande a été livrée"
      case "cancelled":
        return "Votre commande a été annulée"
      default:
        return "Statut inconnu"
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mes Commandes</h1>
          <p className="text-muted-foreground">Suivez l'état de vos commandes et leur livraison</p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "all")} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="all">Toutes ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">En attente ({orders.filter(o => o.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="processing">En cours ({orders.filter(o => o.status === "processing").length})</TabsTrigger>
            <TabsTrigger value="shipped">Expédiées ({orders.filter(o => o.status === "shipped").length})</TabsTrigger>
            <TabsTrigger value="delivered">Livrées ({orders.filter(o => o.status === "delivered").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Aucune commande</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {activeTab === "all" 
                      ? "Vous n'avez pas encore passé de commande. Découvrez notre boutique de pièces détachées."
                      : `Aucune commande ${activeTab === "pending" ? "en attente" : activeTab === "processing" ? "en cours" : activeTab === "shipped" ? "expédiée" : "livrée"}.`
                    }
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/shop">
                      <Button variant="outline">Découvrir la boutique</Button>
                    </Link>
                    <Link href="/cart">
                      <Button>Voir mon panier</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
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
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Statut et description */}
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(order.status)}
                          <span className="font-semibold text-foreground">
                            {getStatusDescription(order.status)}
                          </span>
                        </div>
                        {order.estimatedDelivery && (
                          <p className="text-sm text-muted-foreground">
                            Livraison estimée : {new Date(order.estimatedDelivery).toLocaleDateString("fr-FR")}
                          </p>
                        )}
                        {order.trackingNumber && (
                          <p className="text-sm text-muted-foreground">
                            Numéro de suivi : {order.trackingNumber}
                          </p>
                        )}
                      </div>

                      {/* Articles commandés */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Articles commandés</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Package className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{item.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                  Quantité: {item.quantity} × {item.price.toLocaleString()} FCFA
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground">
                                  {(item.quantity * item.price).toLocaleString()} FCFA
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Informations de livraison */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Adresse de livraison</h4>
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary mt-0.5" />
                            <span className="text-muted-foreground">{order.shippingAddress}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Méthode de paiement</h4>
                          <p className="text-sm text-muted-foreground">
                            {getPaymentMethodText(order.paymentMethod)}
                          </p>
                        </div>
                      </div>

                      {/* Total et actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Total de la commande</p>
                          <p className="text-2xl font-bold text-foreground">
                            {order.total.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir les détails
                          </Button>
                          {order.status === "shipped" && (
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Suivre l'expédition
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contacter le support
                          </Button>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 mb-1">Note de la commande</p>
                          <p className="text-sm text-blue-700">{order.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}