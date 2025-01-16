# Phare Away

Phare Away is an interactive web application designed to promote cultural heritage by gamifying the discovery of lighthouses around the world. Users can participate in mini-games, earn tokens, and contribute to lighthouse preservation efforts.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Phare Away is built with **React**, **Next.js**, and **Tailwind CSS** to ensure a smooth and modern user experience. It features an interactive map, mini-games, and customizable profiles. Revenue generated through in-app purchases contributes to the preservation of lighthouses.

---

## Features

- **Interactive Map**: Unlock and explore lighthouse locations.
- **Mini-Games**: Solve puzzles and earn in-game tokens.
- **Customization**: Personalize your profile and gameplay experience.
- **E-Commerce Integration**: Purchase expansions and collectibles.
- **Accessibility**: Multi-language support and responsive design.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/hugo-brb-phareaway.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hugo-brb-phareaway
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Usage

1. Create an account or log in.
2. Navigate through the map to explore lighthouse locations.
3. Participate in mini-games to earn Beacoins.
4. Purchase expansions and collectibles.
5. Support lighthouse preservation through donations and purchases.

---

## Directory Structure

```
└── hugo-brb-phareaway/
    ├── README.md
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── .eslintrc.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── Asso/
    │   │   └── page.tsx
    │   ├── Home/
    │   │   └── page.tsx
    │   ├── Login/
    │   │   └── page.tsx
    │   ├── Payment/
    │   │   ├── page.tsx
    │   │   └── return/
    │   │       └── page.tsx
    │   ├── Rgpd/
    │   │   └── page.tsx
    │   ├── Signup/
    │   │   └── page.tsx
    │   ├── api/
    │   │   ├── auth/
    │   │   │   ├── [...nextauth]/
    │   │   │   │   └── route.ts
    │   │   │   └── register/
    │   │   │       └── route.ts
    │   │   ├── checkout_sessions/
    │   │   │   └── route.ts
    │   │   ├── mailAccount/
    │   │   │   └── route.js
    │   │   └── mailAsso/
    │   │       └── route.js
    │   └── fonts/
    │       ├── Gravitas.woff2
    │       ├── Ouroboros.woff2
    │       ├── Recursive-Bold.ttf
    │       ├── Recursive.woff2
    ├── components/
    │   ├── BackHome.tsx
    │   ├── Coin.tsx
    │   ├── DlcList.tsx
    │   ├── Loader.tsx
    │   ├── Map.tsx
    │   ├── Menu.tsx
    │   ├── OneBeacoin.tsx
    │   ├── OneEvent.tsx
    │   ├── OneExtention.tsx
    │   ├── OneMarker.tsx
    │   ├── topNav.tsx
    │   ├── model/
    │   │   ├── Beacoin.tsx
    │   │   ├── EnigmeInterface.tsx
    │   │   ├── Image.tsx
    │   │   ├── asso.tsx
    │   │   ├── event.tsx
    │   │   ├── extention.tsx
    │   │   ├── lighthouse.tsx
    │   │   └── player.tsx
    │   └── popover/
    │       ├── About.tsx
    │       ├── Account.tsx
    │       ├── AddEvent.tsx
    │       ├── Answer.tsx
    │       ├── CGU-Acceuil.tsx
    │       ├── CGU.tsx
    │       ├── ConfirmDelete.tsx
    │       ├── ConfirmHint.tsx
    │       ├── ConfirmStore.tsx
    │       ├── Contact.tsx
    │       ├── Enigme.tsx
    │       ├── Events.tsx
    │       ├── Pictures.tsx
    │       ├── SearchBar.tsx
    │       ├── SmallEnigme.tsx
    │       ├── SortButton.tsx
    │       ├── Store.tsx
    │       └── Tips.tsx
    ├── lib/
    │   ├── SessionWrapper.tsx
    │   ├── StyleCreditCard.css
    │   └── authOptions.ts
    └── public/
        ├── icones/
        ├── images/
        └── mascotte/
```

---

## Technologies

- **React**: Frontend framework for building user interfaces.
- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: Typed JavaScript for safer code.
- **PostgreSQL**: Relational database for backend storage.
- **Stripe**: Payment gateway for handling transactions.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/<feature-name>
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add <feature-name>"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/<feature-name>
   ```
5. Open a pull request.

---

Enjoy discovering the world of lighthouses with Phare Away!
