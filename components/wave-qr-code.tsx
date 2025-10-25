"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Smartphone } from "lucide-react"

interface WaveQRCodeProps {
  amount: number
  description: string
  orderId: string
  phone?: string
}

export function WaveQRCode({ amount, description, orderId, phone }: WaveQRCodeProps) {
  const [qrImageUrl, setQrImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const generateQRCode = () => {
    setIsLoading(true)
    
    // Generate Wave payment URL
    const params = new URLSearchParams({
      amount: amount.toString(),
      description: description,
      order: orderId,
    })
    
    if (phone) {
      params.set('phone', phone)
    }
    
    const waveUrl = `wave://pay?${params.toString()}`
    const encodedUrl = encodeURIComponent(waveUrl)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&format=png&bgcolor=ffffff&color=000000&margin=10`
    
    setQrImageUrl(qrUrl)
    setIsLoading(false)
  }

  useEffect(() => {
    generateQRCode()
  }, [amount, description, orderId, phone])

  const handleDownload = () => {
    if (qrImageUrl) {
      const link = document.createElement('a')
      link.href = qrImageUrl
      link.download = `wave-payment-${orderId}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Smartphone className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold">Paiement Wave</h3>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-600 mb-1">Montant à payer</p>
          <p className="text-2xl font-bold text-blue-800">{amount.toLocaleString()} FCFA</p>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
          {isLoading ? (
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
              <Image
                src={qrImageUrl}
                alt="Wave QR Code"
                width={192}
                height={192}
                className="rounded"
                loading="lazy"
              />
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            Code: {orderId}
          </p>
        </div>

        <div className="text-left space-y-2 bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold text-sm">Instructions:</p>
          <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
            <li>Ouvrez l'application Wave</li>
            <li>Scannez ce code QR</li>
            <li>Confirmez le montant</li>
            <li>Validez avec votre PIN</li>
          </ol>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generateQRCode}
            disabled={isLoading}
            className="flex-1"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            disabled={!qrImageUrl}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

