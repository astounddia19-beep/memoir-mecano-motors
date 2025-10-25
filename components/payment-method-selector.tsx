"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Smartphone, CreditCard, Banknote } from "lucide-react"

export type PaymentMethod = "wave" | "orange-money" | "free-money" | "card" | "cash"

interface PaymentMethodSelectorProps {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mode de paiement</CardTitle>
        <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={(v) => onChange(v as PaymentMethod)} className="space-y-3">
          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="wave" id="wave" />
            <Label htmlFor="wave" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Wave</p>
                <p className="text-sm text-muted-foreground">Paiement mobile instantané</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="orange-money" id="orange-money" />
            <Label htmlFor="orange-money" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="font-semibold">Orange Money</p>
                <p className="text-sm text-muted-foreground">Paiement via Orange Money</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="free-money" id="free-money" />
            <Label htmlFor="free-money" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold">Free Money</p>
                <p className="text-sm text-muted-foreground">Paiement via Free Money</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Carte bancaire</p>
                <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <Banknote className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Espèces</p>
                <p className="text-sm text-muted-foreground">Paiement à la livraison</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
