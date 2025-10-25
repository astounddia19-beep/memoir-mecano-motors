import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Navigation } from "lucide-react"
import type { Mechanic } from "@/lib/types"
import Image from "next/image"

interface MechanicCardProps {
  mechanic: Mechanic
  distance?: number | null
}

export function MechanicCard({ mechanic, distance }: MechanicCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative bg-muted">
        <Image 
          src={mechanic.image || "/placeholder.svg"} 
          alt={mechanic.name} 
          fill 
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {distance !== undefined && distance !== null && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Navigation className="h-3 w-3" />
            {distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`}
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl">{mechanic.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {mechanic.city}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-accent text-accent-foreground px-2 py-1 rounded">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-semibold">{mechanic.rating}</span>
            <span className="text-xs">({mechanic.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{mechanic.description}</p>

        <div className="flex flex-wrap gap-2">
          {mechanic.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
          {mechanic.specialties.length > 3 && <Badge variant="secondary">+{mechanic.specialties.length - 3}</Badge>}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{mechanic.experience} ans d'exp.</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-foreground">
            <span>{mechanic.hourlyRate.toLocaleString()} FCFA/h</span>
          </div>
        </div>

        <Link href={`/mechanics/${mechanic.id}`} className="block">
          <Button className="w-full">Voir le profil</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
