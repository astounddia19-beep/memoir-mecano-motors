"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Smartphone, CreditCard, Banknote, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { generateWaveQRImageUrl, generateOrangeMoneyQRImageUrl, generateFreeMoneyQRImageUrl } from "@/lib/wave-qr-generator"

export default function PaymentPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [processing, setProcessing] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const paymentMethod = searchParams.get("method") || "wave"

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (items.length === 0 && !paymentCompleted) {
      router.push("/cart")
    }
  }, [items, router, paymentCompleted])

  const handlePaymentConfirmation = () => {
    if (!user) return

    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        clientId: user.id,
        clientName: user.name,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })),
        total: totalPrice,
        status: "pending",
        shippingAddress: user.address || "Adresse non spécifiée",
        paymentMethod,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 jours
        trackingNumber: `MM${Date.now()}`,
        notes: "Commande passée via Mecano Motor's"
      }

      const ordersKey = `mecano_orders_${user.id}`
      const existingOrders = localStorage.getItem(ordersKey)
      const orders = existingOrders ? JSON.parse(existingOrders) : []
      orders.unshift(order)
      localStorage.setItem(ordersKey, JSON.stringify(orders))

      clearCart()
      setPaymentCompleted(true)
      setProcessing(false)

      toast({
        title: "Paiement confirmé",
        description: `Votre commande de ${totalPrice.toLocaleString()} FCFA a été validée.`,
      })

      setTimeout(() => {
        router.push("/orders")
      }, 2000)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!user) return null

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Paiement réussi !</h2>
              <p className="text-muted-foreground mb-6">
                Votre commande a été confirmée et sera traitée dans les plus brefs délais.
              </p>
              <Button onClick={() => router.push("/orders")}>Voir mes commandes</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case "wave":
      case "orange-money":
      case "free-money":
        const providerName =
          paymentMethod === "wave" ? "Wave" : paymentMethod === "orange-money" ? "Orange Money" : "Free Money"
        const providerColor =
          paymentMethod === "wave" ? "bg-blue-500" : paymentMethod === "orange-money" ? "bg-orange-500" : "bg-red-500"

        // Generate QR code data
        const qrData = {
          amount: totalPrice,
          description: `Commande Mecano Motor's - ${items.length} article(s)`,
          orderId: `MM${Date.now()}`,
        }

        // Get QR code image URL based on payment method
        let qrImageUrl = ""
        if (paymentMethod === "wave") {
          qrImageUrl = generateWaveQRImageUrl(qrData)
        } else if (paymentMethod === "orange-money") {
          qrImageUrl = generateOrangeMoneyQRImageUrl(qrData)
        } else if (paymentMethod === "free-money") {
          qrImageUrl = generateFreeMoneyQRImageUrl(qrData)
        }

        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Paiement {providerName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className={`${providerColor} text-white p-4 rounded-lg`}>
                  <p className="text-sm font-medium mb-2">Montant à payer</p>
                  <p className="text-3xl font-bold">{totalPrice.toLocaleString()} FCFA</p>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Scannez ce code QR avec votre application {providerName}
                  </p>
                  <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src={qrImageUrl}
                      alt={`QR Code ${providerName}`}
                      width={192}
                      height={192}
                      className="rounded"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Code de transaction: #{qrData.orderId}
                  </p>
                </div>

                <div className="text-left space-y-2 bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold text-sm text-foreground">Instructions:</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Ouvrez votre application {providerName}</li>
                    <li>Scannez le code QR ci-dessus</li>
                    <li>Confirmez le montant de {totalPrice.toLocaleString()} FCFA</li>
                    <li>Validez le paiement avec votre code PIN</li>
                  </ol>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handlePaymentConfirmation} disabled={processing}>
                {processing ? "Vérification du paiement..." : "J'ai effectué le paiement"}
              </Button>
            </CardContent>
          </Card>
        )

      case "card":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Paiement par carte bancaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Numéro de carte</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Date d&apos;expiration</Label>
                  <Input id="expiry" placeholder="MM/AA" maxLength={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" maxLength={3} type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-name">Nom sur la carte</Label>
                <Input id="card-name" placeholder="PRENOM NOM" />
              </div>
              <Button className="w-full" size="lg" onClick={handlePaymentConfirmation} disabled={processing}>
                {processing ? "Traitement..." : `Payer ${totalPrice.toLocaleString()} FCFA`}
              </Button>
            </CardContent>
          </Card>
        )

      case "cash":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Paiement en espèces
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg text-center space-y-4">
                <Banknote className="h-12 w-12 text-primary mx-auto" />
                <div>
                  <p className="font-semibold text-foreground mb-2">Paiement à la livraison</p>
                  <p className="text-sm text-muted-foreground">
                    Vous paierez en espèces lors de la réception de votre commande.
                  </p>
                </div>
                <div className="bg-background p-4 rounded border">
                  <p className="text-sm text-muted-foreground mb-1">Montant à préparer</p>
                  <p className="text-2xl font-bold text-foreground">{totalPrice.toLocaleString()} FCFA</p>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={handlePaymentConfirmation} disabled={processing}>
                {processing ? "Confirmation..." : "Confirmer la commande"}
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/cart">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au panier
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Paiement</h1>
            <p className="text-muted-foreground">Finalisez votre commande de {totalPrice.toLocaleString()} FCFA</p>
          </div>

          {renderPaymentMethod()}
        </div>
      </main>
    </div>
  )
}
