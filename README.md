# 🩺 Rapport de stage d’observation – CHP Mohammed V, Safi

Version web du **rapport de stage d’observation** réalisé au Centre Hospitalier Provincial Mohammed V de Safi
(**26/10/2026 → 01/11/2026**) dans le cadre de la filière *Installation et Maintenance Biomédicale* – CMC Marrakech – Tamansourt.

- **Auteur :** Walid Hamada
- **Encadrante professionnelle :** Mme KHALIF Hanane
- **Tuteur enseignant :** M. Mohamed Elbayani
- **Promotion :** 2026/2027

## Contenu

13 chapitres : gynéco-obstétrique, autoclave, néonatologie, imagerie médicale, laboratoire d’analyses,
hémodialyse, bloc opératoire, conclusion — avec 30 figures et des tableaux « définition / rôle / indications » pour chaque appareil.

## Fonctionnalités du site

- Sommaire latéral avec suivi de la section active
- Recherche instantanée d’un appareil
- Thème clair / sombre
- Agrandissement des photos au clic
- Adapté au mobile (tableaux en cartes)
- Impression / export PDF propre (bouton ⎙ ou `Ctrl + P`)
- Téléchargement du `.docx` d’origine

## Structure du projet

```
.
├── index.html                 # page principale
├── 404.html
├── .nojekyll                  # désactive Jekyll sur GitHub Pages
├── .github/workflows/pages.yml# déploiement automatique
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── img/                   # logo + 30 figures (fig01.jpg … fig30.jpg)
    └── docs/                  # rapport .docx d’origine
```

## Publier sur GitHub Pages

### Méthode 1 – Simple (sans Actions)
1. Créer un dépôt sur GitHub, puis envoyer tous les fichiers à la racine du dépôt (branche `main`).
2. **Settings → Pages → Build and deployment → Source : `Deploy from a branch`**.
3. Branche : `main`, dossier : `/ (root)` → **Save**.
4. Le site sera disponible à : `https://<utilisateur>.github.io/<nom-du-depot>/`

### Méthode 2 – Avec GitHub Actions (incluse)
1. **Settings → Pages → Source : `GitHub Actions`**.
2. À chaque `git push` sur `main`, le workflow `.github/workflows/pages.yml` publie le site.

### Commandes Git

```bash
git init
git add .
git commit -m "Rapport de stage – version web"
git branch -M main
git remote add origin https://github.com/<utilisateur>/<nom-du-depot>.git
git push -u origin main
```

## Test en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

---

## 🇸🇦 ملخص بالعربية

هذا المشروع هو النسخة الإلكترونية لتقرير التدريب الملاحظاتي بالمركز الاستشفائي الإقليمي محمد الخامس بآسفي.

**طريقة النشر على GitHub Pages:**
1. أنشئ مستودعاً جديداً على GitHub وارفع **كل محتويات هذا المجلد** (وليس المجلد نفسه) إلى الجذر.
2. اذهب إلى `Settings ← Pages`.
3. اختر `Deploy from a branch` ثم الفرع `main` والمجلد `/ (root)` واضغط `Save`.
4. بعد دقيقة تقريباً سيعمل الموقع على: `https://اسم-المستخدم.github.io/اسم-المستودع/`

> ⚠️ تأكد أن الملف `index.html` في جذر المستودع، وأن أسماء المجلدات (`assets/img` …) كما هي بحروف صغيرة، لأن GitHub حساس لحالة الأحرف.
