import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Car, Euro } from "lucide-react"
import type { Reservation } from "@/lib/types"
import Link from "next/link"

interface ReservationCardProps {
  reservation: Reservation
  showMechanic?: boolean
}

const statusConfig = {
  pending: { label: "En attente", className: "bg-primary/10 text-primary" },
  confirmed: { label: "Confirmé", className: "bg-accent text-accent-foreground" },
  completed: { label: "Terminé", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Annulé", className: "bg-destructive/10 text-destructive" },
}

export function ReservationCard({ reservation, showMechanic = true }: ReservationCardProps) {
  const status = statusConfig[reservation.status]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">{reservation.service}</CardTitle>
            {showMechanic && <p className="text-sm text-muted-foreground">{reservation.mechanicName}</p>}
          </div>
          <Badge className={status.className}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {new Date(reservation.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{reservation.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {reservation.vehicleInfo.make} {reservation.vehicleInfo.model} ({reservation.vehicleInfo.year})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground font-semibold">{reservation.estimatedPrice}€</span>
          </div>
        </div>

        {reservation.notes && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Notes: </span>
              {reservation.notes}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {showMechanic && (
            <Link href={`/mechanics/${reservation.mechanicId}`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Voir le profil
              </Button>
            </Link>
          )}
          {reservation.status === "confirmed" && (
            <Button variant="outline" className="flex-1 bg-transparent text-destructive hover:text-destructive">
              Annuler
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
