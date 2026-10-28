# Site de Véronique Grignet — Nutrithérapeute à Mons

Site vitrine statique construit avec [Astro](https://astro.build). Pas de base de données, pas de serveur applicatif : le résultat est un dossier de fichiers HTML/CSS/images, hébergé sur OVH.

## Lancer le site en local

Prérequis : [Node.js](https://nodejs.org) 22 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

Le site est alors visible sur http://localhost:4321. Les modifications s'affichent en direct.

Pour produire la version à publier :

```bash
npm run build
```

Le site final est généré dans le dossier `dist/`. `npm run preview` permet de le parcourir avant envoi.

## Où modifier quoi

| Je veux…                                   | Fichier                                     |
| ------------------------------------------ | ------------------------------------------- |
| Changer le téléphone, l'e-mail, les réseaux | `src/data/site.ts`                         |
| Ajouter une conférence                     | nouveau fichier dans `src/content/conferences/` |
| Modifier un texte de page                  | `src/pages/*.astro`                         |
| Changer une couleur, une taille de texte   | `src/styles/tokens.css`                     |
| Remplacer une photo                        | `src/assets/photos/` (même nom de fichier)  |

### Ajouter une conférence

Copier un fichier existant de `src/content/conferences/`, le renommer (`AAAA-MM-JJ-sujet.md`) et adapter l'en-tête :

```md
---
titre: "Titre de la conférence"
accroche: "Sous-titre"
date: 2027-01-19T19:00:00
heure: "19 h"
lieu: "Cowor-Coeur"
ville: "Mons – Frameries"
prix: "29 €"
inscription: "Par e-mail ou par SMS."
statut: ouvert            # ou « complet »
affiche: ../../assets/photos/nom-de-l-affiche.jpg   # facultatif
afficheAlt: "Description de l'affiche"
---

Texte de présentation.
```

La conférence la plus proche apparaît automatiquement sur l'accueil. Le site étant statique, « à venir / passée » est calculé **au moment du build** : il faut reconstruire et renvoyer le site après chaque conférence (ou à chaque ajout).

## Formulaire de contact (Web3Forms)

Le formulaire envoie les messages par e-mail via [Web3Forms](https://web3forms.com), service gratuit qui fonctionne sans serveur.

1. Sur web3forms.com, saisir `contact@grignet-nutritherapie.be` pour recevoir une clé d'accès (« Access Key »).
2. La copier dans `src/data/site.ts`, à la place de `A_REMPLACER_PAR_LA_CLE_WEB3FORMS`.
3. Reconstruire et publier. L'encadré « Formulaire non configuré » disparaît alors.
4. Faire un envoi de test depuis le site en ligne et vérifier la réception (et le dossier spam).

> Le formulaire n'a **pas** été testé en envoi réel : la clé n'existe pas encore. Seule la validation des champs a été vérifiée.

## Publication sur OVH

L'hébergement « Hébergement Web » d'OVH (Perso, Pro…) suffit : le site n'utilise ni PHP ni base de données.

1. `npm run build`.
2. Dans l'espace client OVH → Hébergements → onglet FTP-SSH : récupérer l'identifiant et le serveur FTP, définir un mot de passe.
3. Se connecter avec [FileZilla](https://filezilla-project.org) (SFTP si l'offre le permet).
4. Envoyer **le contenu** du dossier `dist/` (pas le dossier lui-même) dans le dossier `www/`, en remplaçant l'existant. Afficher les fichiers cachés pour bien envoyer `.htaccess`.
5. Dans l'espace OVH, vérifier que le domaine `grignet-nutritherapie.be` pointe vers l'hébergement (Multisite) et activer le certificat SSL (Let's Encrypt, gratuit).

Le fichier `public/.htaccess` gère : redirection vers `https://grignet-nutritherapie.be` (sans www), page 404, compression et cache. Si l'adresse officielle doit être `www.`, modifier ce fichier **et** `site` dans `astro.config.mjs`.

⚠️ L'adresse e-mail `contact@grignet-nutritherapie.be` existe déjà : ne pas toucher aux enregistrements DNS « MX » en branchant l'hébergement.

## Préversion sur GitHub Pages

Chaque push sur la branche `main` construit et publie automatiquement une préversion (workflow `.github/workflows/deploy.yml`) à l'adresse `https://<compte>.github.io/<dépôt>/`.

- Le site y est servi dans un sous-dossier : tous les liens internes passent par `url()` (`src/lib/url.ts`), qui ajoute ce préfixe. Pour un nouveau lien interne, écrire `href={url('/page/')}`.
- La préversion est fermée aux moteurs de recherche (`noindex` + `robots.txt` « Disallow »), via la variable `PUBLIC_NOINDEX`.
- Le build OVH (`npm run build` sans variables) n'est pas concerné : base `/`, domaine `grignet-nutritherapie.be`, indexation autorisée.

## Évolution prévue : vente du livre de recettes

Vérifié compatible avec un hébergement statique OVH, sans développement serveur :

- **Recommandé** : une plateforme de vente de produits numériques en « marchand officiel » (Payhip ou Lemon Squeezy). Elle encaisse le paiement, gère la **TVA européenne** (obligatoire pour la vente de fichiers aux particuliers de l'UE), envoie la facture et un **lien de téléchargement sécurisé**. Le site n'affiche qu'une page de présentation et un bouton d'achat (paiement en surimpression). Aucune donnée bancaire ne passe par OVH.
- Alternative possible mais plus lourde : Stripe Checkout + script PHP sur OVH (webhook, liens signés). TVA, factures et sécurité seraient alors à gérer soi-même.

Déjà prévu dans le code : la collection `src/content/publications/` (titre, résumé, prix, couverture, lien de paiement) et l'interrupteur `features.boutique` dans `src/data/site.ts` qui ajoutera l'entrée « Livres » au menu. Il restera à créer la page `src/pages/livres.astro` et des **conditions générales de vente** (dont la renonciation au droit de rétractation pour un contenu numérique téléchargé immédiatement), à faire relire.

## Choix de design (résumé)

- Palette issue de ses visuels : vert pétrole `#0b5550`, émeraude `#009180`, rouge `#c8323b` utilisé avec parcimonie (comme sur ses affiches et… sa tenue).
- Titres en Newsreader (serif éditoriale), textes en Atkinson Hyperlegible Next (conçue pour la lisibilité). Polices hébergées sur le site, sans appel à Google.
- Contrastes vérifiés (texte principal 14,7:1, vert sur blanc 8,6:1).
- Aucune animation au défilement ; navigation au clavier, lien d'évitement, barre de contact fixe sur mobile.

## Contenus à valider

Voir [CONTENU-A-VALIDER.md](CONTENU-A-VALIDER.md). Tous les emplacements manquants sont visibles sur le site sous forme d'encadrés rouges en pointillés.
