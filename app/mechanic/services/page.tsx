"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Wrench, Plus, Trash2 } from "lucide-react"

const defaultServices = [
  { id: "1", name: "Révision complète", price: "25000", enabled: true },
  { id: "2", name: "Vidange", price: "15000", enabled: true },
  { id: "3", name: "Réparation freins", price: "20000", enabled: true },
  { id: "4", name: "Diagnostic électronique", price: "10000", enabled: true },
  { id: "5", name: "Réparation moteur", price: "50000", enabled: false },
  { id: "6", name: "Climatisation", price: "30000", enabled: false },
]

export default function MechanicServicesPage() {
  const [services, setServices] = useState(defaultServices)
  const [newService, setNewService] = useState({ name: "", price: "" })

  const handleToggleService = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const handleAddService = () => {
    if (newService.name && newService.price) {
      setServices([
        ...services,
        {
          id: Date.now().toString(),
          ...newService,
          enabled: true,
        },
      ])
      setNewService({ name: "", price: "" })
    }
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleSave = () => {
    localStorage.setItem("mechanic_services", JSON.stringify(services))
    alert("Services mis à jour avec succès!")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Gérer mes services</h2>
          <p className="text-muted-foreground">Configurez les services que vous proposez</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Services disponibles</CardTitle>
              <CardDescription>Activez ou désactivez vos services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox checked={service.enabled} onCheckedChange={() => handleToggleService(service.id)} />
                    <div className="flex-1">
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {Number.parseInt(service.price).toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              {services.length === 0 && (
                <div className="py-8 text-center">
                  <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">Aucun service configuré</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ajouter un service</CardTitle>
              <CardDescription>Créez un nouveau service personnalisé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Nom du service</Label>
                <Input
                  id="serviceName"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="Ex: Réparation suspension"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servicePrice">Prix (FCFA)</Label>
                <Input
                  id="servicePrice"
                  type="number"
                  min="0"
                  step="1000"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  placeholder="Ex: 35000"
                />
              </div>

              <Button onClick={handleAddService} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le service
              </Button>

              <div className="pt-4 border-t">
                <Button onClick={handleSave} className="w-full" variant="default">
                  Enregistrer tous les changements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
