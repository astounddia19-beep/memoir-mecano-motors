"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Mail, Phone, MapPin, Clock, Send, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message envoyé!",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary rounded-lg p-2">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mecano Motor's</h1>
              <p className="text-xs text-muted-foreground">Sénégal</p>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contactez-Nous</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                  <CardDescription className="text-base">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+221 XX XXX XX XX"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:contact@mecanomotors.sn" className="text-primary hover:underline font-medium">
                    contact@mecanomotors.sn
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Réponse sous 24h ouvrées</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Téléphone</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+221707491518" className="text-primary hover:underline font-medium text-lg">
                    +221 70 749 15 18
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">Lun - Ven: 8h - 18h</p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Adresse</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sicap Liberté 6, Extension
                    <br />
                    Dakar, Sénégal
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Horaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Lundi - Vendredi:</span>
                      <span className="font-medium">8h - 18h</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Samedi:</span>
                      <span className="font-medium">9h - 14h</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche:</span>
                      <span className="font-medium">Fermé</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Questions Fréquentes</h3>
            <p className="text-muted-foreground mb-8">Consultez notre FAQ ou contactez-nous directement</p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comment créer un compte?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur "S'inscrire", choisissez votre rôle (Client, Mécanicien ou Vendeur) et remplissez le
                    formulaire.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quels moyens de paiement acceptez-vous?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Wave, Orange Money, Free Money, carte bancaire et paiement en espèces.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comment devenir mécanicien partenaire?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Inscrivez-vous avec le rôle "Mécanicien", complétez votre profil et notre équipe validera votre
                    compte.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">La plateforme est-elle gratuite?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Oui, l'inscription et l'utilisation de base sont totalement gratuites pour tous les utilisateurs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
