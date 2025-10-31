# 🚗 Mecano Motor's - Plateforme Automobile du Sénégal

Une plateforme complète pour connecter les propriétaires de véhicules avec des mécaniciens qualifiés et des vendeurs de pièces détachées au Sénégal.

## ✨ Fonctionnalités

- 🔧 **Recherche de mécaniciens** avec géolocalisation
- 🛒 **Boutique en ligne** de pièces détachées
- 📅 **Système de réservation** en ligne
- 💬 **Messagerie** intégrée
- 💳 **Paiements** Wave, Orange Money, Free Money
- ⭐ **Système d'avis** et de notation
- 📱 **Interface responsive** mobile-first

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ 
- PostgreSQL
- npm ou pnpm

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd mecano-motors
```

2. **Installer les dépendances**
```bash
npm install
# ou
pnpm install
```

3. **Configuration de l'environnement**
```bash
cp env.example .env.local
```

4. **Configurer la base de données**
```bash
# Générer le client Prisma
npm run db:generate

# Appliquer les migrations
npm run db:migrate

# Peupler la base de données
npm run db:seed
```

5. **Démarrer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Vérification du code
- `npm run type-check` - Vérification TypeScript
- `npm run test` - Tests unitaires
- `npm run db:studio` - Interface Prisma Studio
- `npm run validate-env` - Validation des variables d'environnement

## 🏗️ Architecture

```
├── app/                 # Pages Next.js 13+ (App Router)
├── components/          # Composants React réutilisables
├── lib/                 # Utilitaires et configuration
├── prisma/              # Schéma de base de données
├── public/              # Assets statiques
└── __tests__/           # Tests unitaires
```

## 🗄️ Base de Données

Le projet utilise Prisma avec PostgreSQL. Le schéma inclut :

- **Users** - Utilisateurs (clients, mécaniciens, vendeurs)
- **Mechanics** - Profils des mécaniciens
- **Products** - Catalogue de pièces détachées
- **Reservations** - Réservations de services
- **Orders** - Commandes de pièces
- **Messages** - Système de messagerie
- **Reviews** - Avis et notations

## 🔐 Variables d'Environnement

Voir `env.example` pour la liste complète des variables requises.

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 📱 Technologies

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Base de données**: PostgreSQL, Prisma
- **Authentification**: NextAuth.js
- **Paiements**: Wave, Orange Money, Free Money
- **Tests**: Jest, Testing Library

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email: contact@mecanomotors.sn
- Téléphone: +221 70 749 15 18

---

Fait avec ❤️ au Sénégal 🇸🇳

