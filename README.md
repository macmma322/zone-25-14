
<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

# ZONE-25-14

<em>Loyalty. Brotherhood. Rebellion. More than a platform — a legacy.</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/macmma322/zone-25-14?style=flat&logo=git&logoColor=white&color=ff2d00" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/macmma322/zone-25-14?style=flat&color=ff2d00" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/macmma322/zone-25-14?style=flat&color=ff2d00" alt="repo-language-count">

<em>Built using:</em> PostgreSQL • Node.js • Express • React • Next.js • Tailwind CSS • TypeScript • Stripe • Redis • OAuth2

</div>
<br>

---

## 📌 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [Installation](#installation)
- [Development Guide](#development-guide)
- [Niches & Identity](#niches--identity)
- [License](#license)

---

## 🔍 Overview

**Zone 25-14** is a loyalty-powered hybrid platform that blends e-commerce, community, and lifestyle. Built from the bond between two founders (and possibly a third), it serves dreamers, rebels, and outsiders who crave authenticity, purpose, and power.

This isn't just a website — it's a digital rebellion forged through:

- User-driven interaction and identity
- Niche-focused subscriptions and perks
- Real-time messaging and social features
- Secure authentication and rewards
- A fully personalized and scalable architecture

---

## 🧱 Project Structure

```
zone-25-14/
├── zone_25-14_database/       # SQL schemas, triggers, seeders, documentation
├── zone_25-14_backend/        # Node.js API, auth, controllers, services
├── zone_25-14_frontend/       # React + Next.js frontend with TailwindCSS
```

Each layer is built to be modular, secure, and ready to scale. Sensitive data is encrypted via `pgcrypto`, and user roles map directly to visual and financial perks.

---

## ⚙️ Core Features

### 🔐 Security & Auth

- JWT-based login (switching to HttpOnly Cookie Auth)
- OAuth2 with Google (expandable)
- Encrypted emails/phones with `pgp_sym_encrypt`

### 🛍️ E-Commerce & Subscriptions

- Full product/variation/brand/category logic
- Tiered subscriptions across 1–7 niche bundles
- Gift cards, coupons, wishlists, mystery boxes

### 🧬 Social & Loyalty

- Friendships, real-time messages, message requests
- Roles/levels tied to points and discounts
- Badges, achievements, donations, giveaways

### 🖼️ UI & Themes

- Fully responsive interface with TailwindCSS
- Dynamic themes per niche (dark/light mode)
- Accent colors: Scarlet Red, Terminal Green, Royal Violet, Burnt Clay, and more

---

## 🚀 Installation

### Prerequisites

- PostgreSQL 15+
- Node.js 20+
- Redis (optional but recommended)
- Stripe API key
- Google OAuth credentials

---

### Backend
```sh
git clone https://github.com/macmma322/zone-25-14-backend
cd zone-25-14-backend
npm install
npm run dev
```

---

### Frontend
```sh
git clone https://github.com/macmma322/zone-25-14-frontend
cd zone-25-14-frontend
npm install
npm run dev
```

---

### Database
```sh
git clone https://github.com/macmma322/zone-25-14-database
# Apply schemas under database/schemas/
# Then run triggers and seeders
```

---

## 🎭 Niches & Identity

Every niche is a world of its own — but they all share one heart:

| Niche          | Theme               | Color        | Keywords                          |
|----------------|---------------------|--------------|-----------------------------------|
| OtakuSquad     | Anime               | #FF2D00      | Emotional, escapist, expressive   |
| ᛋᛏᛟᛁᚲ (StoikrClub) | Gym                 | Deep Gold     | Discipline, strength, stoicism    |
| WD Crew        | Car Culture         | #3F51B5      | Drift, chrome, brotherhood        |
| PerOs Pack     | Motorcycle Rebellion| #8E735B      | Chaos, freedom, grit              |
| CritHit Team   | Gaming              | #FF5F1F      | Skill, glitch, adrenaline         |
| The Grid Opus  | Coding/Cyber        | #39FF14      | Hack, build, innovate             |
| The Syndicate  | Luxury Aesthetic    | #86608E      | Power, silence, style             |

---

## 📄 License

Zone 25-14 is not just code. It’s a living legacy. All rights reserved by the original founders.

> *"You don’t need to fit in. You just need to belong."*

---

<div align="center"><a href="#top">⬆ Return to Top</a></div>
