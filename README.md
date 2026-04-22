# My Favorite Places app

## Travailler avec docker
Pour travailler avec docker, il faut d'abord s'assurer que celui-ci est installé et que le daemon est en cours d'exécution. Cela peut être vérifié en exécutant les commandes suivantes dans le terminal:
```bash
docker --version
docker info
```

### Démarrer le projet
Pour démarrer le projet (backend et frontend), il suffit d'exécuter la commande suivante à la racine du projet:
```bash
docker compose up --build
```
cette commande va construire les images docker pour le backend et le frontend, puis démarrer les conteneurs correspondants.
L'application sera accessible suivant les ports configurés dans le fichier `compose.yml`

### Développement, arrêter/redémarrer le projet
Pendant le développement, il est nécessaire de reconstruire les images et de redémarrer les conteneurs pour que les changements soient pris en compte.

```bash
# Reconstruire les images et redémarrer les conteneurs
docker compose up --build
```

> Pour arrêter le projet, il suffit d'exécuter la commande suivante:
```bash
docker compose down
```

> _Note: Certaines configurations de projet (autres que ce repo) peuvent supporter le rechargement à chaud (hot reload) en mode développement, pour éviter de devoir reconstruire les images et redémarrer les conteneurs à chaque changement._

### Production
Pour lancer le projet pour la production ou dans l'optique de tester la configuration de production, il suffit d'exécuter la commande suivante:

```bash
docker compose -f compose.prod.yml up --build
```

## WorkFlow (CI/CD)

### Déclencheurs des différents flows et leurs actions
Le projet dispose de plusieurs workflows GitHub Actions automatisant les tests et la création d'images :
- **Tests** : Déclenchés lors d'un `push` sur n'importe quelle branche, dès qu'une modification survient dans les dossiers `server/**` ou `client/**`. (Setup un environnement de test, exécute la suite de tests).
- **Build DEV** : Déclenchés lors d'un `push` sur la branche `dev` (si les fichiers sources associés sont modifiés). Ils packagent l'image Docker correspondante et l'envoient sur le registre avec le tag `dev`.
- **Build PROD** : Déclenchés lors de la création d'un **tag** spécifique (ex: `server-v*`, `server-*.*.*` pour le backend, et `client-v*` pour le frontend) sur le dernier commit d'une branche. Cela produit une image Docker taggée avec la version correspondante (ex: `v1.0.0`) et la pousse sur le registre pour être utilisée en production.
> Note: les builds produits sur la branche `main` sont également taggés avec `latest`.

### Effets de bord des flows
- **Création d'artefacts (CD)** : Les workflows de "Build" créent et publient des images Docker sur le **GitHub Container Registry (GHCR)** sous l'URL `ghcr.io/<owner>/<repo>-server` et `-client`. Ces images servent d'artefacts prêts à être déployés.
- **Validation CI** : Les workflows de test génèrent un statut de succès ou d'échec sur les commits, ce qui permet de bloquer d'éventuelles PR (Pull Requests) si le code ne passe pas les tests.

### Environnements d'exécution
Les workflows s'exécutent sur des runners **Ubuntu (`ubuntu-latest`)** fournis par GitHub Actions. 

### Development avec la CI
- Les développeurs travaillent sur des branches de développement
- lors d'un PR, il est nécessaire de s'assurer que les tests passent pour pouvoir merger la pr sur la branche `main`.
