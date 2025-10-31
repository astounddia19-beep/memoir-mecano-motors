# 🚀 Guide de Déploiement - Mecano Motor's

## 📋 Prérequis

- Compte Vercel
- Base de données PostgreSQL (Neon, Supabase, ou Vercel Postgres)
- Compte Google Cloud (pour OAuth)

## 🗄️ Configuration PostgreSQL

### Option 1: Neon (Recommandé - Gratuit)

1. Créez un compte sur [Neon](https://neon.tech)
2. Créez un nouveau projet
3. Copiez la `DATABASE_URL` fournie
4. Ajoutez-la à votre fichier `.env.local`

```bash
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/mecano_motors?sslmode=require"
```

### Option 2: Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans Settings > Database
4. Copiez la `Connection string` (URI)

### Option 3: Vercel Postgres

1. Dans votre projet Vercel
2. Allez dans Storage > Create Database
3. Sélectionnez Postgres
4. Les variables d'environnement seront automatiquement ajoutées

## 🔐 Configuration OAuth Google

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez l'API Google+ 
4. Créez des identifiants OAuth 2.0
5. Ajoutez les URLs autorisées :
   - `http://localhost:3000` (développement)
   - `https://votre-domaine.vercel.app` (production)
6. Ajoutez les URLs de redirection :
   - `http://localhost:3000/api/auth/callback/google`
   - `https://votre-domaine.vercel.app/api/auth/callback/google`
7. Copiez `Client ID` et `Client Secret`

## 🔧 Configuration des Variables d'Environnement

Créez un fichier `.env.local` :

```bash
# Database
DATABASE_URL="your-postgresql-url"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payment APIs (optionnel pour le début)
WAVE_API_KEY="your-wave-api-key"
WAVE_API_SECRET="your-wave-api-secret"
ORANGE_MONEY_API_KEY="your-orange-money-api-key"
ORANGE_MONEY_API_SECRET="your-orange-money-api-secret"

# Email (optionnel pour le début)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Push Notifications (optionnel)
VAPID_PUBLIC_KEY="your-vapid-public-key"
VAPID_PRIVATE_KEY="your-vapid-private-key"
```

### Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 📦 Migration de la Base de Données

```bash
# Générer le client Prisma
pnpm run db:generate

# Appliquer les migrations
pnpm run db:push

# Peupler la base de données (optionnel)
pnpm run db:seed
```

## 🚀 Déploiement sur Vercel

### 1. Via l'interface Vercel

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository Git
4. Configurez les variables d'environnement dans Settings > Environment Variables
5. Déployez !

### 2. Via la CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### 3. Configuration Vercel

Dans votre `vercel.json` (créé automatiquement) :

```json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## 🔄 Workflow de Déploiement

### Développement Local

```bash
# Démarrer le serveur de développement
pnpm dev

# Lancer les tests
pnpm test

# Vérifier les types
pnpm type-check

# Linter le code
pnpm lint
```

### CI/CD Automatique

Vercel déploiera automatiquement :
- **Production** : sur push vers `main`/`master`
- **Preview** : sur chaque Pull Request

## 🔍 Vérification Post-Déploiement

1. **Base de données** : Vérifiez que Prisma peut se connecter
2. **Authentification** : Testez la connexion et l'inscription
3. **API Routes** : Testez les endpoints principaux
4. **Images** : Vérifiez le chargement des images
5. **Paiements** : Testez en mode sandbox d'abord

## 🐛 Debugging

### Logs Vercel

```bash
vercel logs
```

### Erreurs courantes

**Database connection failed**
- Vérifiez que `DATABASE_URL` est correcte
- Assurez-vous que l'IP de Vercel est autorisée (si applicable)
- Vérifiez `sslmode=require` dans la connection string

**NextAuth session error**
- Vérifiez que `NEXTAUTH_SECRET` est défini
- Vérifiez que `NEXTAUTH_URL` correspond à votre domaine

**OAuth redirect mismatch**
- Vérifiez les URLs de redirection dans Google Cloud Console
- Assurez-vous qu'elles correspondent exactement

## 📊 Monitoring

### Vercel Analytics

Activez Vercel Analytics pour suivre :
- Temps de chargement des pages
- Core Web Vitals
- Trafic utilisateur

### Sentry (Recommandé)

```bash
pnpm add @sentry/nextjs

# Suivre les instructions d'installation
pnpm sentry:sourcemaps
```

## 🔒 Sécurité

### Checklist Pré-Production

- [ ] Toutes les variables sensibles sont dans `.env` et **NON** dans le code
- [ ] `.env` est dans `.gitignore`
- [ ] `NEXTAUTH_SECRET` est unique et sécurisé
- [ ] SSL/TLS est activé
- [ ] CORS est configuré correctement
- [ ] Rate limiting est implémenté sur les APIs critiques
- [ ] Validation des données côté serveur
- [ ] Hachage des mots de passe avec bcrypt
- [ ] Protection CSRF active

## 🎉 Go Live!

Une fois tout vérifié :

1. Configurez votre domaine personnalisé dans Vercel
2. Testez en profondeur
3. Activez le monitoring
4. Communiquez le lancement ! 🚀

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs
- Documentation Prisma : https://www.prisma.io/docs
- Documentation NextAuth.js : https://next-auth.js.org

