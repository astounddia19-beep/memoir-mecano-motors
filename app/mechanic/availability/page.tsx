"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"

const daysOfWeek = [
  { id: "monday", label: "Lundi" },
  { id: "tuesday", label: "Mardi" },
  { id: "wednesday", label: "Mercredi" },
  { id: "thursday", label: "Jeudi" },
  { id: "friday", label: "Vendredi" },
  { id: "saturday", label: "Samedi" },
  { id: "sunday", label: "Dimanche" },
]

export default function MechanicAvailabilityPage() {
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "08:00", end: "18:00" },
    tuesday: { enabled: true, start: "08:00", end: "18:00" },
    wednesday: { enabled: true, start: "08:00", end: "18:00" },
    thursday: { enabled: true, start: "08:00", end: "18:00" },
    friday: { enabled: true, start: "08:00", end: "18:00" },
    saturday: { enabled: true, start: "08:00", end: "14:00" },
    sunday: { enabled: false, start: "08:00", end: "18:00" },
  })

  const handleToggleDay = (day: string) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day as keyof typeof availability],
        enabled: !availability[day as keyof typeof availability].enabled,
      },
    })
  }

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day as keyof typeof availability], [field]: value },
    })
  }

  const handleSave = () => {
    localStorage.setItem("mechanic_availability", JSON.stringify(availability))
    alert("Disponibilités mises à jour avec succès!")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Mes disponibilités</h2>
          <p className="text-muted-foreground">Configurez vos horaires de travail</p>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Horaires d'ouverture</CardTitle>
            <CardDescription>Définissez vos jours et heures de travail</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {daysOfWeek.map((day) => {
              const dayData = availability[day.id as keyof typeof availability]
              return (
                <div key={day.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Checkbox checked={dayData.enabled} onCheckedChange={() => handleToggleDay(day.id)} />
                  <div className="flex-1 grid md:grid-cols-3 gap-4 items-center">
                    <Label className="font-medium">{day.label}</Label>
                    {dayData.enabled ? (
                      <>
                        <div className="space-y-1">
                          <Label htmlFor={`${day.id}-start`} className="text-xs text-muted-foreground">
                            Ouverture
                          </Label>
                          <Input
                            id={`${day.id}-start`}
                            type="time"
                            value={dayData.start}
                            onChange={(e) => handleTimeChange(day.id, "start", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`${day.id}-end`} className="text-xs text-muted-foreground">
                            Fermeture
                          </Label>
                          <Input
                            id={`${day.id}-end`}
                            type="time"
                            value={dayData.end}
                            onChange={(e) => handleTimeChange(day.id, "end", e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground col-span-2">Fermé</p>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="pt-4">
              <Button onClick={handleSave} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Enregistrer les disponibilités
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
