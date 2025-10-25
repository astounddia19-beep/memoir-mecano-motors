"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"

export default function VendorStatsPage() {
  // Mock data - in real app, this would come from database
  const stats = {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    averageOrderValue: 0,
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Statistiques de vente</h2>
          <p className="text-muted-foreground">Analysez vos performances commerciales</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Revenus totaux</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</p>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Commandes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Produits actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  <p className="text-xs text-muted-foreground">En stock</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Panier moyen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.averageOrderValue.toLocaleString()} FCFA</p>
                  <p className="text-xs text-muted-foreground">Par commande</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Aperçu des ventes</CardTitle>
            <CardDescription>Vos performances sur les 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">Aucune donnée de vente pour le moment</p>
              <p className="text-sm text-muted-foreground">
                Commencez à vendre des produits pour voir vos statistiques ici
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
