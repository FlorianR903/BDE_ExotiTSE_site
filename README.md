# BDE ExotiTSE - Site Marchand

Site web du BDE ExotiTSE avec système de paiement en ligne via Stripe.

## Fonctionnalités

- 🛒 **Panier intelligent** : Ajout/suppression d'articles, gestion des quantités
- 💳 **Paiement Stripe** : Intégration complète avec Stripe Checkout
- 💾 **Persistance** : Le panier est sauvegardé dans le localStorage
- 📱 **Responsive** : Interface adaptée mobile et desktop
- ✅ **Pages de confirmation** : Pages de succès et d'annulation après paiement

## Installation

1. Cloner le dépôt
```bash
git clone https://github.com/FlorianR903/BDE_ExotiTSE_site.git
cd BDE_ExotiTSE_site
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement

Copier le fichier `.env.example` vers `.env.local` et renseigner vos clés Stripe :

```bash
cp .env.example .env.local
```

Puis éditer `.env.local` avec vos clés :
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Configurer les produits dans Stripe

Les produits et prix sont récupérés automatiquement depuis votre compte Stripe. Assurez-vous d'avoir créé des produits actifs avec un prix par défaut.

5. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Configuration Stripe

### Créer des produits

1. Connectez-vous à votre dashboard Stripe
2. Allez dans **Produits** > **Ajouter un produit**
3. Remplissez les informations :
   - Nom du produit
   - Description
   - Images
   - Prix par défaut
4. Le produit sera automatiquement affiché dans le menu du site

### Script utilitaire

Un script `create_price.js` est disponible pour créer des produits en masse :

```bash
node create_price.js
```

## Développement

### Structure du projet

```
├── pages/               # Pages Next.js
│   ├── index.js        # Page d'accueil
│   ├── menu.js         # Page menu
│   ├── success.js      # Page de confirmation
│   └── cancel.js       # Page d'annulation
├── components/         # Composants React
│   ├── Cart.js         # Composant panier
│   ├── CartContext.js  # Context pour la gestion du panier
│   ├── MenuSection.js  # Section menu
│   └── Nav.js          # Navigation
├── app/api/           # API Routes
│   ├── menu/          # Récupération des produits Stripe
│   └── create-checkout-session/  # Création de session Stripe
└── styles/            # Styles CSS
```

### Build de production

```bash
npm run build
npm start
```

## Utilisation

### Ajouter des articles au panier

1. Naviguer vers la page Menu
2. Cliquer sur "Ajouter au panier" pour un article
3. Le panier se met à jour automatiquement

### Gérer le panier

- Cliquer sur "Panier" dans la navigation
- Utiliser les boutons +/- pour ajuster les quantités
- Cliquer sur la croix pour retirer un article
- Le panier est automatiquement sauvegardé

### Passer commande

1. Ouvrir le panier
2. Vérifier les articles et le total
3. Cliquer sur "Payer le panier"
4. Compléter le paiement sur Stripe Checkout
5. Redirection vers la page de confirmation

## Technologies

- **Next.js 16** - Framework React
- **Stripe** - Paiement en ligne
- **Tailwind CSS** - Styles
- **Framer Motion** - Animations

## Support

Pour toute question ou problème, ouvrir une issue sur GitHub.

## Licence

MIT
