# Eterna - E-commerce Vue.js

Une application e-commerce moderne construite avec Vue.js 3, Vue Router, Vuex et Axios.

## 🚀 Fonctionnalités

- Navigation par catégories (Shoes, Jewellery, Clothes)
- Filtrage et tri des produits
- Panier d'achat
- Favoris
- Vue détaillée des produits
- Formulaire de feedback

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run serve
```

L'application sera accessible sur `http://localhost:8080`

## 🏗️ Build pour production

```bash
npm run build
```

## 📡 API

L'application utilise My JSON Server pour l'API :
- URL: `https://my-json-server.typicode.com/amalbenjamaa/eternaa`
- Repository: `https://github.com/amalbenjamaa/eternaa`

## 🛠️ Technologies utilisées

- Vue.js 3
- Vue Router
- Vuex
- Axios
- JSON Server (My JSON Server)

## 🌐 Déploiement sur GitHub Pages

Le projet est configuré pour être déployé automatiquement sur GitHub Pages.

### Configuration automatique (recommandé)

1. **Activez GitHub Pages dans votre repository :**
   - Allez dans Settings → Pages
   - Source : sélectionnez "GitHub Actions"

2. **Le déploiement se fait automatiquement :**
   - À chaque push sur la branche `main`, le site sera déployé automatiquement
   - Le workflow GitHub Actions se trouve dans `.github/workflows/deploy.yml`

3. **Votre site sera accessible à :**
   - `https://amalbenjamaa.github.io/eterna/`

### Configuration manuelle

Si vous préférez déployer manuellement :

```bash
npm run build
# Puis poussez le dossier dist/ vers la branche gh-pages
```

### Important

- Assurez-vous que le `publicPath` dans `vue.config.js` correspond au nom de votre repository
- Si votre repository s'appelle différemment, modifiez `publicPath: '/NOM_REPO/'` dans `vue.config.js`

## 📝 Configuration

Voir [Configuration Reference](https://cli.vuejs.org/config/).
