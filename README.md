# Adithya Shashikumaar Gurikar — Portfolio

A high-performance, Apple-inspired **scrollytelling portfolio** built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Framer Motion**. Features buttery-smooth inertial scrolling, canvas-based 3D frame sequence animation, and a custom magnetic cursor.

---

## ✨ Features

- **🎬 3D Scrollytelling Canvas**:
  - 240 high-fidelity frames rendered onto an HTML5 Canvas with Retina (`window.devicePixelRatio`) support.
  - Symmetrical **bi-directional kinetic LERP loop** at 120 FPS that responds to both scrolling forward and reverse.
  - Concurrency-pooled progressive WebP asset loading for instant paint with zero blank/black flash.
  - Dynamic aspect-ratio `cover` scaling with automated watermark edge-cropping.

- **🧈 Butter-Smooth Inertial Scrolling**:
  - Powered by **Lenis** with custom exponential ease-out physics.
  - Disabled browser `scrollRestoration` to guarantee fresh reloads always start cleanly at the top (`0, 0`).
  - Seamless in-page smooth navigation without hash-anchor reload jumps.

- **✨ Custom Cosmic Cursor**:
  - Instant-response precision core tracking dot.
  - Damped magnetic aura ring that expands over interactive elements (`buttons`, `links`, `cards`).
  - Shimmering stardust particle sparks emitted during cursor movement.
  - Automatically disabled on touchscreens and mobile devices (`pointer: fine` query).

- **🎭 Coordinated Text Transitions**:
  - Multi-phase typography animations driven by spring physics (`useSpring`).
  - Non-overlapping fade windows so each statement glides in and out in locked synchrony with the 3D visual.

- **📱 Fully Responsive**:
  - Designed with modern dark aesthetic (`#121212`), glassmorphism, and responsive layouts across mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | App Router, Turbopack, and SSR/SSG foundation |
| **React 19** | Concurrent UI components and hooks |
| **TypeScript** | Type safety and robust component interfaces |
| **Tailwind CSS v4** | Utility-first styling and theme tokens |
| **Framer Motion** | Spring physics, text orchestration, and icon micro-interactions |
| **Lenis** | Smooth inertial momentum scrolling |
| **Lucide Icons** | Minimalist UI iconography |

---

## 📂 Project Structure

```text
portfolio/
├── package.json              # Root workspace orchestrator & postinstall scripts
├── README.md                 # Project documentation
└── sequence/                 # Main Next.js application workspace
    ├── public/
    │   └── sequence/         # Optimized 240-frame sequence (WebP / PNG)
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx    # Root layout, fonts, SEO, SmoothScroll & Cursor providers
    │   │   ├── page.tsx      # Main single-page application structure
    │   │   └── globals.css   # Global styles, scrollbar styling, and Lenis CSS
    │   └── components/
    │       ├── Navbar.tsx        # Floating glassmorphic header with smooth scroll hooks
    │       ├── ScrollyCanvas.tsx # 120 FPS bi-directional canvas scrollytelling engine
    │       ├── Overlay.tsx       # Kinetic typography with non-overlapping spring crossfades
    │       ├── About.tsx         # Dedicated biography and philosophy section
    │       ├── Projects.tsx      # Selected work & portfolio project cards
    │       ├── Contact.tsx       # Interactive connect cards with animated icons
    │       ├── CustomCursor.tsx  # Dual-element magnetic cursor with particle spark trail
    │       └── SmoothScroll.tsx  # Lenis inertia scroll provider and reload stabilizer
    ├── next.config.ts        # Next.js & Turbopack configuration
    └── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adithya-gurikar/portfolio.git
cd portfolio
```

### 2. Install dependencies

Running `npm install` in the root repository automatically triggers the `postinstall` script to resolve dependencies in the `sequence` workspace:

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production server:

```bash
npm run start
```

---

## 📬 Contact & Connect

**Adithya Shashikumaar Gurikar**

- 🇺🇸 **US Phone**: [+1 (217) 621-0538](tel:+12176210538)
- 🇮🇳 **India Phone**: [+91 63661 20580](tel:+916366120580)
- ✉️ **Email**: [adithyagurikar10@gmail.com](mailto:adithyagurikar10@gmail.com)
- 💼 **LinkedIn**: [adithya-shashikumaar-gurikar](https://www.linkedin.com/in/adithya-shashikumaar-gurikar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).