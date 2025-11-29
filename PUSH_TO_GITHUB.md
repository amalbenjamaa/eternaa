# Instructions pour pousser vers GitHub

## Si vous créez un NOUVEAU repository :

1. Allez sur https://github.com/new
2. Nommez-le (ex: `eterna` ou `eterna-ecommerce`)
3. **Ne cochez PAS** "Initialize with README"
4. Cliquez sur "Create repository"

Ensuite, exécutez ces commandes :

```bash
# Si le repository s'appelle différemment, changez l'URL :
git remote set-url origin https://github.com/amalbenjamaa/VOTRE_NOM_REPO.git

# Puis poussez :
git push -u origin main
```

## Si vous utilisez un repository EXISTANT :

```bash
# Remplacez VOTRE_NOM_REPO par le nom réel de votre repository
git remote set-url origin https://github.com/amalbenjamaa/VOTRE_NOM_REPO.git
git push -u origin main
```

## Si vous avez besoin d'authentification :

GitHub nécessite un **Personal Access Token** au lieu d'un mot de passe :

1. Allez sur https://github.com/settings/tokens
2. Cliquez sur "Generate new token (classic)"
3. Donnez-lui un nom (ex: "eterna-project")
4. Cochez la scope `repo`
5. Cliquez sur "Generate token"
6. **Copiez le token** (vous ne pourrez plus le voir après)
7. Utilisez ce token comme mot de passe lors du `git push`

