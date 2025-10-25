"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { PaymentMethodSelector, type PaymentMethod } from "@/components/payment-method-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wave")
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  const handleCheckout = () => {
    if (!user) return

    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des articles avant de passer commande.",
        variant: "destructive",
      })
      return
    }

    // Redirect to payment page with selected payment method
    router.push(`/payment?method=${paymentMethod}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Panier</h1>
          <p className="text-muted-foreground">Vérifiez vos articles avant de passer commande</p>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Votre panier est vide</p>
              <Link href="/shop">
                <Button>Continuer mes achats</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 relative bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <Link href={`/shop/${item.product.id}`}>
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 h-8 text-center"
                              min="1"
                              max={item.product.stock}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {(item.product.price * item.quantity).toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" onClick={clearCart} className="w-full bg-transparent text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Vider le panier
              </Button>
            </div>

            <div className="lg:col-span-1 space-y-4">
              <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium text-foreground">{totalPrice.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="font-medium text-foreground">Gratuite</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">{totalPrice.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Passer la commande
                  </Button>

                  <Link href="/shop">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continuer mes achats
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
