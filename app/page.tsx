import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, ShoppingCart, Star, MapPin, Clock, Shield, TrendingUp, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mecano Motor&apos;s</h1>
              <p className="text-xs text-muted-foreground">Sénégal</p>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                S&apos;inscrire
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30" variant="outline">
              Plateforme N°1 au Sénégal
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Votre Garage Digital au Sénégal
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Trouvez des mécaniciens qualifiés près de chez vous, réservez en ligne et achetez vos pièces détachées en
              toute confiance
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link href="/mechanics">
                <Button size="lg" variant="outline" className="text-base h-12 px-8 border-2 bg-transparent">
                  Trouver un Mécanicien
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Paiements sécurisés</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" />
                <span>Avis vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Partout au Sénégal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Pourquoi Choisir Mecano Motor&apos;s?
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une plateforme complète pour tous vos besoins automobiles
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-4">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                  <Wrench className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Mécaniciens Qualifiés</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Trouvez des professionnels certifiés près de chez vous à Dakar, Thiès, Pikine et partout au Sénégal
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="space-y-4">
                <div className="bg-accent/10 w-14 h-14 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Pièces Détachées</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Large sélection de pièces de qualité à prix compétitifs. Paiement Wave, Orange Money accepté
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-4">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Réservation Rapide</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Prenez rendez-vous en quelques clics et recevez une confirmation instantanée
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="space-y-4">
                <div className="bg-accent/10 w-14 h-14 rounded-xl flex items-center justify-center">
                  <Star className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Avis Clients</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Consultez les évaluations et témoignages des autres utilisateurs avant de choisir
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Comment Ça Marche?</h3>
            <p className="text-muted-foreground text-lg">Simple, rapide et efficace</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-xl font-semibold mb-3">Créez votre compte</h4>
              <p className="text-muted-foreground leading-relaxed">Inscrivez-vous gratuitement en quelques secondes</p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">Trouvez votre mécanicien</h4>
              <p className="text-muted-foreground leading-relaxed">
                Utilisez la géolocalisation pour trouver les garages près de vous
              </p>
            </div>

            <div className="text-center">
              <div className="bg-destructive text-destructive-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Réservez et payez</h4>
              <p className="text-muted-foreground leading-relaxed">
                Prenez rendez-vous et payez avec Wave, Orange Money ou en espèces
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <TrendingUp className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Rejoignez-nous Aujourd&apos;hui</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Des milliers de Sénégalais font déjà confiance à Mecano Motor&apos;s pour l&apos;entretien de leurs
            véhicules
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-base h-12 px-8 shadow-xl hover:scale-105 transition-transform"
            >
              Créer un Compte Gratuit
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Wrench className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Mecano Motor&apos;s</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                La plateforme automobile de référence au Sénégal
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+221707491518" className="text-primary hover:underline font-medium">
                  +221 70 749 15 18
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/mechanics" className="hover:text-primary transition-colors">
                    Trouver un mécanicien
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-primary transition-colors">
                    Boutique de pièces
                  </Link>
                </li>
                <li>
                  <Link href="/reservations" className="hover:text-primary transition-colors">
                    Réservations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-primary transition-colors">
                    Devenir partenaire
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Paiements acceptés</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Wave
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Orange Money
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Free Money
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Espèces
                </Badge>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Mecano Motor&apos;s. Tous droits réservés. Fait avec ❤️ au Sénégal</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
