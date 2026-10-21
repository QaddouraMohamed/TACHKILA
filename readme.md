<div align="center">

# ⚽ TACHKILA

**Gestionnaire de composition d'équipe en 4-4-2 pour le club amateur Atlas FC**

[🌐 Démo en ligne](https://tachkila-woad.vercel.app/) · [📦 Dépôt GitHub](https://github.com/QaddouraMohamed/TACHKILA)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![CSS Grid](https://img.shields.io/badge/CSS_Grid-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6-F7DF1E?logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Déployé_sur-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## 📖 Présentation

**TACHKILA** (« composition » en arabe dialectal) est une application web interactive qui permet à l'entraîneur d'**Atlas FC** de digitaliser la préparation de ses compositions d'équipe.

L'entraîneur peut gérer son effectif (ajout, modification, suppression de joueurs) puis placer ses joueurs sur un terrain schématisé en **4-4-2**, en respectant la compatibilité entre le poste du joueur et la position visée : un gardien ne peut pas jouer en attaque.

Ce projet consolide :

- la manipulation du **DOM** (sélection, parcours, création, modification, suppression) ;
- la gestion des **événements** (propagation, délégation) ;
- la **validation de formulaires** avec des expressions régulières ;
- l'intégration **responsive** avec **Tailwind CSS** et **CSS Grid**.

---

## 🚀 Démo

👉 **[https://tachkila-woad.vercel.app/](https://tachkila-woad.vercel.app/)**

---

## ✨ Fonctionnalités

### Gestion de l'effectif

- ➕ **Ajouter** un joueur depuis une modale (nom complet, poste, numéro) ; il arrive automatiquement **sur le banc**.
- ✏️ **Modifier** un joueur dans une modale préremplie. Si son poste change alors qu'il est sur le terrain, il **retourne sur le banc**.
- 🗑️ **Supprimer** un joueur après confirmation ; sa position redevient **Libre**.
- 🔢 **Compteurs automatiques** : nombre de joueurs de l'effectif et « Joueurs placés : x / 11 ».

### Terrain et placement

- 🟩 Terrain en **CSS Grid natif** (12 colonnes × 9 lignes) avec les 11 positions du 4-4-2.
- 🎯 **Assignation** d'un joueur à une position via un `select` présent sur sa carte, acceptée **uniquement si** la position correspond à son poste **et** qu'elle est libre.
- 🔁 Option **« Sur le banc »** pour libérer la position d'un joueur.
- 👆 Un clic sur un joueur placé met en évidence sa case sur le terrain.
- Case **Occupée** : affiche le numéro et le nom du joueur ; la carte du joueur dans l'aside devient **pâle**.

### Code couleur

| Poste               | Couleur  |
| ------------------- | -------- |
| **GB** : Gardien    | 🟡 Jaune |
| **DEF** : Défenseur | 🔵 Bleu  |
| **MIL** : Milieu    | 🟢 Vert  |
| **ATT** : Attaquant | 🔴 Rouge |

Les états des positions (**Libre** / **Occupée**) sont également distingués visuellement.

### Positions du 4-4-2

| Ligne   | Positions                 |
| ------- | ------------------------- |
| Gardien | `GB`                      |
| Défense | `DG` · `DC` · `DC` · `DD` |
| Milieu  | `MG` · `MC` · `MC` · `MD` |
| Attaque | `BU` · `BU`               |

### Formulaire et validation (temps réel)

Validation avec **regex** à chaque saisie ; l'erreur s'affiche **sous le champ concerné**.

| Champ  | Règle                                              |
| ------ | -------------------------------------------------- |
| Nom    | Obligatoire, lettres uniquement, 3 à 30 caractères |
| Poste  | Obligatoire                                        |
| Numéro | Obligatoire, de 1 à 99, **unique** dans l'effectif |

### Expérience utilisateur

- 🔔 Messages de **succès / erreur** qui disparaissent après **3 secondes**.
- ❌ Fermeture de la modale avec **×**, **Annuler**, la touche **Échap** ou un **clic sur le fond** (un clic dans la fenêtre ne la ferme pas).
- 💾 **Persistance** de l'effectif et de la composition après actualisation (`localStorage`).
- 📱 Interface **responsive** : desktop, tablette et mobile.

---

## 🛠️ Technologies

| Technologie          | Usage                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| **HTML5**            | Structure de la page et du terrain (toutes les cases écrites en HTML) |
| **Tailwind CSS**     | Mise en page et responsive (header, aside, zone principale)           |
| **CSS Grid**         | Construction du terrain (`grid-column`, `grid-row`)                   |
| **JavaScript (ES6)** | Logique métier, DOM, événements, validation                           |
| **localStorage**     | Sauvegarde des données (`JSON.stringify` / `JSON.parse`)              |
| **Vercel**           | Hébergement                                                           |

---

## 🗂️ Structure du projet

```
TACHKILA/
├── assets/        # Icônes et images (logo, etc.)
├── css/           # Feuilles de style
├── js/            # Scripts JavaScript
├── target/        # Fichiers générés
└── index.html     # Page principale
```

---

## 🧱 Modèle de données

L'effectif est stocké dans un tableau d'objets, synchronisé avec le `localStorage` :

```js
{
  id: 1,            // identifiant unique
  nom: "Karim Benzema",
  numero: 9,        // 1 à 99, unique
  poste: "ATT",     // GB | DEF | MIL | ATT
  position: "BU1"   // position occupée sur le terrain, ou null si sur le banc
}
```

---

## 🧠 Choix techniques

- **Terrain 100 % HTML/CSS** : les cases sont écrites en HTML et placées avec `grid-column` / `grid-row`. JavaScript se contente de mettre à jour les cases de position, retrouvées grâce à l'attribut `data-position`.
- **Éléments dynamiques en JavaScript** : cartes des joueurs et options des `select` créées avec `createElement`, `appendChild`, `textContent` et `classList`.
- **Délégation d'événements** : un seul écouteur `change` sur la liste des joueurs gère le choix de la position.
- **Suppression** : parcours du DOM avec `closest()` pour retrouver la carte, puis `remove()`.
- **Messages d'erreur** : retrouvés avec `nextElementSibling` à partir du champ concerné.
- **Propagation** : `stopPropagation()` empêche la fermeture de la modale lors d'un clic à l'intérieur de la fenêtre.
- **Formulaire** : événement `submit` avec `preventDefault()` et validation en temps réel via l'événement `input`.
- **Séparation des responsabilités** : HTML / CSS / JavaScript dans des fichiers distincts ; usage exclusif de `const` et `let`.

---

## ⚙️ Installation et lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/QaddouraMohamed/TACHKILA.git

# 2. Se placer dans le dossier
cd TACHKILA
```

Puis ouvrir `index.html` dans le navigateur, ou utiliser une extension comme **Live Server** (VS Code) pour un rechargement automatique.

> Aucune dépendance à installer pour consulter le projet.

---

## 📋 Utilisation

1. Cliquer sur le bouton d'ajout dans l'**aside** pour créer un joueur (nom, poste, numéro).
2. Le joueur apparaît dans l'effectif, **sur le banc**.
3. Choisir une position dans le `select` de sa carte : seules les positions compatibles avec son poste sont acceptées.
4. La case correspondante du terrain passe en **Occupée** et la carte du joueur devient pâle.
5. Choisir **« Sur le banc »** pour libérer la position, ✏️ pour modifier, 🗑️ pour supprimer.

---

## 📱 Responsive

L'interface s'adapte à trois formats grâce aux breakpoints de Tailwind CSS : **desktop**, **tablette** et **mobile**.

---

## 👤 Auteur

**Mohamed Qaddoura**
GitHub : [@QaddouraMohamed](https://github.com/QaddouraMohamed)

---

<div align="center">

Projet réalisé pour **Atlas FC** ⚽

</div>
