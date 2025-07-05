# Food Truck Mobile App

Une application mobile React Native développée avec Expo pour la gestion de produits avec authentification.

## Aperçu du projet

Cette application mobile propose une plateforme complète pour la gestion de produits avec :
- **Authentification** : Système de connexion/inscription avec chiffrement bcrypt
- **Gestion des produits** : CRUD complet avec recherche et filtrage
- **Interface moderne** : Design responsive avec thèmes personnalisés
- **Navigation intuitive** : Navigation par onglets et stack navigation avec `React Navigation`
- **Persistance des données** : AsyncStorage pour la sauvegarde locale

## Fonctionnalités

### Authentification
- Connexion avec email/mot de passe
- Inscription avec validation des données
- Chiffrement sécurisé des mots de passe (bcrypt)
- Persistance de la session utilisateur
- Déconnexion

### Gestion des produits
- Liste des produits avec recherche
- Détails complets des produits
- Ajout/modification de produits
- Upload d'images produits

### Gestion de Profile
- Modification de l'information de l'utilisateurs
- Validation des champs

## Technologies utilisées

### Framework & Core
- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **TypeScript** - Typage statique
- **React** - Bibliothèque UI

### Navigation
- **React Navigation** - Navigation native
- **Bottom Tabs** - Navigation par onglets
- **Stack Navigator** - Navigation empilée

### Interface utilisateur
- **React Native Paper**  - Composants Material Design
- **React Native Elements** - Composants UI
- **React Native Vector Icons** - Icônes vectorielles
- **Expo Vector Icons** - Icônes Expo

### Gestion des données
- **AsyncStorage**  - Stockage local
- **Context API** - Gestion d'état globale
- **bcryptjs** - Chiffrement des mots de passe

### Fonctionnalités natives
- **Expo Image Picker** - Sélection d'images

## Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Expo CLI
- Emulateur ou téléphone pour tester

### Installation des dépendances

```bash
# Cloner le repository
git clone <votre-repo>
cd test.mobile

# Installer les dépendances
yarn install
```

### Configuration Expo

```bash
# Installer Expo CLI globalement (si pas déjà fait)
npm install -g @expo/cli

# Vérifier l'installation
expo --version
```

## Lancement de l'application

### Démarrage du serveur de développement

```bash
# Démarrer le serveur Expo
npm start
# ou
expo start

# Lancer directement sur Android
npm run android
# ou
expo start --android

# Lancer directement sur iOS
npm run ios
# ou
expo start --ios

# Lancer sur le web
npm run web
# ou
expo start --web
```

### Utilisation avec Expo Go

1. Installer l'app **Expo Go** sur votre téléphone
2. Scanner le QR code affiché dans le terminal
3. L'application se lancera automatiquement

### Utilisation avec un émulateur

**Android :**
```bash
# Lancer l'émulateur Android
npm run android
```

**iOS (Mac uniquement) :**
```bash
# Lancer le simulateur iOS
npm run ios
```

## Structure du projet

```
├── App.tsx                 # Point d'entrée principal
├── app.json               # Configuration Expo
├── package.json           # Dépendances et scripts
├── tsconfig.json          # Configuration TypeScript
├── components/            # Composants réutilisables
│   ├── Badge.tsx          # Composant badge
│   ├── Button.tsx         # Boutons personnalisés
│   ├── Card.tsx           # Cartes d'affichage
│   ├── Header.tsx         # En-tête de l'app
│   ├── Input.tsx          # Champs de saisie
│   ├── ProductCard.tsx    # Carte produit
│   ├── SearchBar.tsx      # Barre de recherche

├── context/               # Contextes React
│   ├── AuthContext.tsx    # Contexte d'authentification
│   └── ProductContext.tsx # Contexte des produits
├── navigation/            # Configuration navigation
│   ├── AppTabs.tsx        # Navigation par onglets
│   ├── AuthStack.tsx      # Stack authentification
│   └── ProductStack.tsx   # Stack produits
├── screens/               # Écrans de l'application
│   ├── LoginScreen.tsx    # Écran de connexion
│   ├── RegisterScreen.tsx # Écran d'inscription
│   ├── ProductListScreen.tsx # Liste des produits
│   ├── ProductDetailScreen.tsx # Détails produit
│   ├── ProductFormScreen.tsx # Formulaire produit
│   └── ProfileScreen.tsx  # Profil utilisateur
├── services/              # Services API
│   ├── product.service.ts # Service produits
│   └── user.service.ts    # Service utilisateurs
├── types/                 # Définitions TypeScript
│   ├── auth.ts           # Types authentification
│   ├── product.ts        # Types produits
│   └── navigation.ts     # Types navigation
├── utils/                 # Utilitaires
│   ├── encrypt.ts        # Chiffrement
│   ├── validation.ts     # Validation des données
│   └── initProducts.ts   # Initialisation produits
├── data/                  # Données de test
│   ├── products.json     # Produits de démonstration
│   └── users.js          # Utilisateurs de test
├── assets/               # Ressources statiques
│   ├── images/           # Images
│   └── fonts/            # Polices
└── constants/            # Constantes
    └── Colors.ts         # Palette de couleurs
```

## Choix techniques

### Architecture
- **Context API** pour la gestion d'état globale
- **TypeScript** pour le typage statique et la maintenabilité
- **React Navigation** pour une navigation native fluide
- **Expo** pour un développement rapide et un déploiement simplifié

### Sécurité
- **bcryptjs** pour le chiffrement des mots de passe
- **AsyncStorage** pour la persistance sécurisée des données
- Validation des données d'entrée avec des types TypeScript

### UI/UX
- **React Native Paper** pour des composants Material Design cohérents
- **Composants réutilisables** pour la consistance du design

## Comptes de test

```javascript
// Utilisateurs de démonstration
Email: test@example.com
Mot de passe: hashedPassword
```