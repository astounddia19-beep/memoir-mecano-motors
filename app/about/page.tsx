import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, Users, Target, Heart, Shield, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react"

export default function AboutPage() {
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">À Propos de Mecano Motor's</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              La première plateforme digitale qui révolutionne le secteur automobile au Sénégal en connectant
              mécaniciens, clients et vendeurs de pièces détachées.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 mb-12">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Notre Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Faciliter l'accès aux services automobiles de qualité pour tous les Sénégalais en digitalisant le
                  secteur. Nous voulons rendre la recherche de mécaniciens, la réservation de rendez-vous et l'achat de
                  pièces détachées aussi simple qu'un clic sur votre smartphone.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 mb-12">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent/10 p-3 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Notre Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Devenir la référence incontournable de l'automobile au Sénégal et en Afrique de l'Ouest. Nous
                  imaginons un écosystème où chaque propriétaire de véhicule peut trouver rapidement un professionnel
                  qualifié près de chez lui, comparer les prix, lire les avis et prendre des décisions éclairées.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Nos Valeurs</h3>
            <p className="text-muted-foreground text-lg">Ce qui guide notre action au quotidien</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Confiance</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Mécaniciens vérifiés, avis authentiques et paiements sécurisés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Accessibilité</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Une plateforme simple, mobile-first et adaptée au contexte local
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Proximité</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Valoriser les garages de quartier et les artisans locaux
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Innovation</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Utiliser la technologie pour améliorer le quotidien des Sénégalais
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Comment Ça Fonctionne?</h3>
            <p className="text-muted-foreground text-lg">Une plateforme pensée pour tous</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Pour les Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Trouvez des mécaniciens près de vous avec la géolocalisation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Comparez les tarifs et consultez les avis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Réservez en ligne et payez avec Wave ou Orange Money</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Achetez vos pièces détachées directement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Pour les Mécaniciens</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Créez votre profil professionnel en ligne</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Recevez des demandes de clients qualifiés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Gérez vos rendez-vous facilement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Développez votre clientèle et votre réputation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Pour les Vendeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Créez votre boutique en ligne gratuitement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Ajoutez vos produits avec photos et descriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Recevez des commandes de toute la région</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Suivez vos ventes et statistiques en temps réel</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez la Révolution Automobile</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Que vous soyez client, mécanicien ou vendeur, Mecano Motor's est fait pour vous
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base h-12 px-8">
                Créer un Compte
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base h-12 px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
