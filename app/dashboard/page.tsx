"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Wrench, ShoppingCart, MessageSquare, Package, Users, TrendingUp, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!user) return null

  // Render different dashboards based on user role
  if (user.role === "client") {
    return <ClientDashboard user={user} />
  } else if (user.role === "mechanic") {
    return <MechanicDashboard />
  } else if (user.role === "vendor") {
    return <VendorDashboard />
  } else if (user.role === "admin") {
    return <AdminDashboard />
  }

  return null
}

function ClientDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState({
    reservations: 0,
    orders: 0,
    messages: 0,
  })

  useEffect(() => {
    if (user) {
      // Récupérer les réservations
      const reservationsKey = `mecano_reservations_${user.id}`
      const storedReservations = localStorage.getItem(reservationsKey)
      const reservations = storedReservations ? JSON.parse(storedReservations) : []

      // Récupérer les commandes
      const ordersKey = `mecano_orders_${user.id}`
      const storedOrders = localStorage.getItem(ordersKey)
      const orders = storedOrders ? JSON.parse(storedOrders) : []

      setStats({
        reservations: reservations.length,
        orders: orders.length,
        messages: 0, // TODO: Implémenter les messages
      })
    }
  }, [user])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tableau de bord Client</h2>
          <p className="text-muted-foreground">Gérez vos réservations et commandes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Réservations actives" value={stats.reservations.toString()} icon={Calendar} description="En cours" />
          <StatCard title="Commandes" value={stats.orders.toString()} icon={ShoppingCart} description="Total" />
          <StatCard title="Messages" value={stats.messages.toString()} icon={MessageSquare} description="Non lus" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/mechanics" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Wrench className="h-4 w-4 mr-2" />
                  Trouver un mécanicien
                </Button>
              </Link>
              <Link href="/shop" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Acheter des pièces
                </Button>
              </Link>
              <Link href="/reservations" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Mes réservations
                </Button>
              </Link>
              <Link href="/orders" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Mes commandes
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réservations récentes</CardTitle>
              <CardDescription>Vos dernières demandes de service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-4">Vous n'avez pas encore de réservations</p>
                <Link href="/mechanics">
                  <Button size="sm">Trouver un mécanicien</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function MechanicDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tableau de bord Mécanicien</h2>
          <p className="text-muted-foreground">Gérez vos services et rendez-vous</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Réservations" value="0" icon={Calendar} description="Ce mois" />
          <StatCard title="Clients" value="0" icon={Users} description="Total" />
          <StatCard title="Messages" value="0" icon={MessageSquare} description="Non lus" />
          <StatCard title="Note moyenne" value="-" icon={TrendingUp} description="Pas encore d'avis" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Prochains rendez-vous</CardTitle>
              <CardDescription>Vos réservations à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-2">Aucun rendez-vous pour le moment</p>
                <p className="text-sm text-muted-foreground">
                  Les clients pourront vous réserver une fois votre profil complété
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion du profil</CardTitle>
              <CardDescription>Mettez à jour vos informations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/mechanic/profile" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Modifier mon profil
                </Button>
              </Link>
              <Link href="/mechanic/services" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Wrench className="h-4 w-4 mr-2" />
                  Gérer mes services
                </Button>
              </Link>
              <Link href="/mechanic/availability" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Disponibilités
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function VendorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tableau de bord Vendeur</h2>
          <p className="text-muted-foreground">Gérez vos produits et commandes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Produits" value="0" icon={Package} description="En stock" />
          <StatCard title="Commandes" value="0" icon={ShoppingCart} description="Ce mois" />
          <StatCard title="Revenus" value="0 FCFA" icon={TrendingUp} description="Ce mois" />
          <StatCard title="Messages" value="0" icon={MessageSquare} description="Non lus" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Commandes récentes</CardTitle>
              <CardDescription>Dernières commandes reçues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-2">Aucune commande pour le moment</p>
                <p className="text-sm text-muted-foreground">Ajoutez des produits pour commencer à vendre</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des produits</CardTitle>
              <CardDescription>Gérez votre catalogue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/vendor/products/new" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Ajouter un produit
                </Button>
              </Link>
              <Link href="/vendor/orders" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Voir toutes les commandes
                </Button>
              </Link>
              <Link href="/vendor/stats" className="block">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Statistiques de vente
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tableau de bord Administrateur</h2>
          <p className="text-muted-foreground">Vue d'ensemble de la plateforme</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Utilisateurs" value="1,234" icon={Users} description="Total" />
          <StatCard title="Mécaniciens" value="87" icon={Wrench} description="Actifs" />
          <StatCard title="Commandes" value="456" icon={ShoppingCart} description="Ce mois" />
          <StatCard title="Revenus" value="45,890€" icon={TrendingUp} description="Ce mois" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Nouvel utilisateur</p>
                    <p className="text-sm text-muted-foreground">Jean Dupont s'est inscrit comme client</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Wrench className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Nouveau mécanicien</p>
                    <p className="text-sm text-muted-foreground">Garage Martin a rejoint la plateforme</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Commande importante</p>
                    <p className="text-sm text-muted-foreground">Commande de 450€ effectuée</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Administration</CardTitle>
              <CardDescription>Outils de gestion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Gérer les utilisateurs
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Wrench className="h-4 w-4 mr-2" />
                Valider les mécaniciens
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Rapports et statistiques
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
