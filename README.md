# .jhun{} — Official Company Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Professional web development services — portfolio, contact & company presentation platform**

**🌐 [jhun.com.tr](https://jhun.com.tr)**

[Features](#-features) • [Tech Stack](#️-technology-stack) • [Installation](#-installation) • [API](#-api-endpoints) • [Chatbot](#-ai-chatbot) • [Deployment](#-deployment)

</div>

---

## 📋 About the Project

**.jhun{}** is the official company website and service showcase for jhun — a professional web development studio. The platform presents the company's portfolio, blog content, technology expertise, and service offerings while enabling direct client contact.

Built with a modern full-stack architecture, the site supports **bilingual content (English & Turkish)** via `next-intl`, integrates an **AI-powered chatbot** using Anthropic and Google Generative AI, and features a fully functional **admin panel** for content management — all within a single Next.js application.

The website serves as both a live marketing asset and a technical demonstration of the studio's capabilities.

---

## ✨ Features

### 🌍 Public-Facing Features

- **Multilingual Support** — Full English and Turkish localization via `next-intl` with locale-prefixed routing (`/en`, `/tr`)
- **Language Switcher** — Seamless runtime language toggle without page reload
- **Dark / Light Theme** — User preference-aware theme switching with `next-themes`
- **Hero Section** — Animated landing with particle effects, aurora background, and typing text
- **Portfolio / Projects** — Detailed project showcase with technology tags and descriptions
- **Blog** — SEO-optimized articles with detail pages and dynamic routing
- **Technology Stack Display** — Visual catalog of technologies used across projects
- **Contact Form** — Email delivery via Nodemailer with form validation (Zod + React Hook Form)
- **About Page** — Company story, team, and values
- **CV Download** — Bilingual CV available in HTML and PDF formats (English & Turkish)
- **Social Sidebar** — Persistent social media links (GitHub, LinkedIn, Instagram, WhatsApp, Facebook)
- **Scroll to Top** — Smooth scroll-back control
- **Cookie Consent** — Privacy-compliant cookie management

### 🤖 AI Chatbot

- **Dual AI Engine** — Anthropic Claude SDK + Google Generative AI working in tandem
- **Keyword-Based Pre-Responses** — Fast responses via `data/keywords.json` for common questions
- **Contextual Fallback** — Routes to live AI model when no keyword match is found
- **Stats Panel** — Real-time chatbot usage statistics
- **Typing Indicator** — Visual feedback while the AI is generating a response
- **Persistent Chat UI** — Slide-in chat widget available on all pages

### 🔧 Admin Panel

- **Blog Management** — Create, edit, delete blog posts with image upload
- **Project Management** — Add and manage portfolio projects with metadata
- **Technology Management** — Maintain the technology catalog displayed site-wide
- **Cloudinary Integration** — Image upload and management within admin modals
- **Protected Routes** — Admin area secured via NextAuth.js session

### ⚙️ Technical Features

- **Next.js App Router (SSR/SSG)** — Optimized rendering strategy per page
- **MongoDB + Mongoose** — Flexible NoSQL data modeling
- **NextAuth.js** — Admin authentication with session management
- **Zod + React Hook Form** — Type-safe, performant form validation
- **Framer Motion + GSAP** — Rich animations and scroll-triggered effects
- **25+ Custom UI Effects** — Aurora, vortex, meteors, sparkles, marquee, magnetic buttons, and more (shadcn-io components)
- **SEO Optimization** — Dynamic `og:image`, meta tags, `robots.txt`, and structured routing
- **Responsive Design** — Mobile-first layout across all pages

---

## 🛠️ Technology Stack

### Frontend

| Technology         | Version  | Description                               |
| ------------------ | -------- | ----------------------------------------- |
| Next.js            | 16.0.10  | App Router, SSR/SSG, API Routes           |
| React              | 19.2.1   | Component-based UI                        |
| TypeScript         | 5        | Type-safe development                     |
| Tailwind CSS       | 4        | Utility-first styling                     |
| Radix UI           | 1.4.x    | Accessible UI primitives (20+ components) |
| Framer Motion      | 12.23.25 | Page & component animations               |
| GSAP               | 3.14.1   | Scroll-triggered and timeline animations  |
| next-intl          | 4.5.8    | i18n / multilingual routing               |
| next-themes        | 0.4.6    | Dark/light theme management               |
| Lucide React       | 0.556.0  | Icon library                              |
| Embla Carousel     | 8.6.0    | Touch-friendly carousels                  |
| React Hook Form    | 7.68.0   | Form state management                     |
| Zod                | 4.1.13   | Schema validation                         |
| Recharts           | 3.5.1    | Analytics charts in admin                 |
| react-fast-marquee | 1.6.5    | Scrolling technology banner               |
| tsparticles        | 3.9.1    | Particle background effects               |
| Sonner             | 2.0.7    | Toast notifications                       |

### Backend & Database

| Technology  | Version | Description             |
| ----------- | ------- | ----------------------- |
| MongoDB     | 7.0.0   | NoSQL document database |
| Mongoose    | 9.0.1   | MongoDB ODM             |
| NextAuth.js | 4.24.13 | Admin authentication    |
| bcrypt      | 6.0.0   | Password hashing        |
| Nodemailer  | 7.0.11  | Transactional email     |
| Cloudinary  | 2.8.0   | Image upload & CDN      |

### AI & Integrations

| Technology           | Version | Description                    |
| -------------------- | ------- | ------------------------------ |
| Anthropic AI SDK     | 0.78.0  | Claude-powered chatbot         |
| Google Generative AI | 0.24.1  | Gemini AI fallback             |
| @mlc-ai/web-llm      | 0.2.80  | Client-side LLM (experimental) |

### UI Effect Components (shadcn-io)

The project includes 25+ premium animated UI components:

| Component            | Description                         |
| -------------------- | ----------------------------------- |
| Aurora Background    | Animated gradient aurora effect     |
| Vortex               | Swirling particle vortex background |
| Meteors              | Falling meteor animation            |
| Sparkles             | Interactive sparkle overlays        |
| Flickering Grid      | Animated grid background            |
| Shooting Stars       | Night-sky shooting star effect      |
| 3D Card              | Mouse-tracking 3D card tilt         |
| 3D Marquee           | Depth-perspective scrolling marquee |
| Magnetic Button      | Mouse-attracted CTA button          |
| Typing Text          | Typewriter text animation           |
| Rolling Text         | Vertical rolling text reveal        |
| Splitting Text       | Character-split reveal animation    |
| Text Hover Effect    | SVG stroke hover animation          |
| Text Reveal          | Scroll-triggered text reveal        |
| Gradient Text        | Animated gradient text fill         |
| Colourful Text       | Rainbow-cycle text                  |
| Highlight Text       | Animated text highlight             |
| Wavy Background      | SVG wave background                 |
| Grid Pattern         | Decorative grid overlay             |
| Background Gradient  | Animated gradient card borders      |
| Marquee              | Horizontal scrolling content strip  |
| Pixel Image          | Pixel-dissolve image effect         |
| Image Zoom           | Click-to-zoom image viewer          |
| Shape Landing Hero   | Geometric animated hero             |
| Fireworks Background | Particle fireworks effect           |

---

## 🏗️ Architecture Overview

```
Browser / Client
       │
       ├── /en  or  /tr   (next-intl locale routing)
       │
       ▼
  Next.js App Router
  ┌─────────────────────────────────────────┐
  │  [locale]/             (Public pages)   │
  │  ├── /                 (Homepage)       │
  │  ├── /about            (About)          │
  │  ├── /blog & /blog/[id](Blog)           │
  │  ├── /projects/[id]    (Portfolio)      │
  │  └── /contact          (Contact)        │
  │                                         │
  │  /admin/               (Admin Panel)    │
  │  ├── /blogs                             │
  │  ├── /projects                          │
  │  └── /technologies                      │
  │                                         │
  │  /api/                 (API Routes)     │
  │  ├── auth, blog, projects               │
  │  ├── technology, mail                   │
  │  ├── chat, upload                       │
  └─────────────────────────────────────────┘
         │                    │
         ▼                    ▼
      MongoDB             Cloudinary
    (Mongoose)           (Images/CDN)
         │
    Anthropic AI  +  Google Generative AI
    (Chatbot backend)
         │
    Nodemailer
    (Contact emails)
```

---

## 📁 Project Structure

```
jhun/
├── app/
│   ├── [locale]/                   # Locale-prefixed public pages
│   │   ├── page.tsx                # Homepage
│   │   ├── layout.tsx              # Locale layout (navbar, footer, chatbot)
│   │   ├── about/page.tsx          # About page
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [id]/page.tsx       # Blog detail
│   │   └── projects/
│   │       ├── page.tsx            # Portfolio listing
│   │       └── [id]/page.tsx       # Project detail
│   ├── admin/                      # Admin panel (no locale prefix)
│   │   ├── page.tsx                # Admin login
│   │   ├── blogs/page.tsx          # Blog management
│   │   ├── projects/page.tsx       # Project management
│   │   └── technologies/page.tsx   # Technology management
│   ├── api/                        # Next.js API route handlers
│   │   ├── auth/[...nextauth]/     # NextAuth handler
│   │   ├── auth/logout/            # Session destroy
│   │   ├── blog/                   # Blog CRUD
│   │   ├── blog/[id]/              # Single blog operations
│   │   ├── projects/               # Project CRUD
│   │   ├── projects/[id]/          # Single project operations
│   │   ├── technology/             # Technology CRUD
│   │   ├── technology/[id]/        # Single technology operations
│   │   ├── chat/                   # AI chatbot endpoint
│   │   ├── mail/                   # Contact form email sender
│   │   └── upload/                 # Cloudinary upload handler
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── not-found.tsx               # 404 page
│
├── components/
│   ├── admin/
│   │   ├── login.tsx               # Admin login form
│   │   ├── sidebar.tsx             # Admin sidebar navigation
│   │   ├── blog/                   # Blog list, add/edit modals
│   │   ├── project/                # Project list, add/edit modals
│   │   └── technology/             # Technology list and modal
│   ├── blog/
│   │   ├── blogs.tsx               # Blog listing (server)
│   │   ├── blogsClient.tsx         # Blog listing (client interactions)
│   │   ├── blogDetail.tsx          # Blog detail (server)
│   │   └── blogDetailClient.tsx    # Blog detail (client interactions)
│   ├── chatbot/
│   │   ├── chatBot.tsx             # Main chatbot container
│   │   ├── chatBotClient.tsx       # Client-side chat logic
│   │   ├── chatButton.tsx          # Floating chat trigger button
│   │   ├── chatHeader.tsx          # Chat window header
│   │   ├── chatInput.tsx           # Message input field
│   │   ├── messageBubble.tsx       # Individual message component
│   │   ├── statsPanel.tsx          # Usage stats display
│   │   └── typingIndicator.tsx     # AI typing animation
│   ├── contact/
│   │   ├── contact.tsx             # Contact form (server)
│   │   ├── contactClient.tsx       # Contact form (client)
│   │   ├── about.tsx               # About section (server)
│   │   └── aboutClient.tsx         # About section (client)
│   ├── home/
│   │   ├── heroes.tsx              # Hero section (server)
│   │   ├── heroesClient.tsx        # Hero section animations
│   │   ├── banner.tsx              # Technology banner strip
│   │   ├── about.tsx               # Home about section
│   │   ├── aboutClient.tsx         # Home about animations
│   │   ├── gallery.tsx             # Project gallery preview
│   │   ├── galleryClient.tsx       # Gallery interactions
│   │   ├── contact.tsx             # Home contact CTA
│   │   └── contactClient.tsx       # Home contact animations
│   ├── layout/
│   │   ├── navbar.tsx              # Navigation bar (server)
│   │   ├── navbarClient.tsx        # Navbar interactions & mobile menu
│   │   ├── footer.tsx              # Footer (server)
│   │   ├── footerClient.tsx        # Footer animations
│   │   ├── clientLayoutWrapper.tsx # Client boundary for layouts
│   │   ├── languageSwitcher.tsx    # EN/TR toggle button
│   │   ├── localeProvider.tsx      # next-intl provider wrapper
│   │   ├── themeProvider.tsx       # next-themes provider
│   │   ├── themeToggle.tsx         # Dark/light mode toggle button
│   │   ├── socialSidebar.tsx       # Fixed social media links
│   │   ├── chatBot.tsx             # Chatbot layout injection
│   │   └── scroll.tsx              # Scroll to top button
│   ├── projects/
│   │   ├── projects.tsx            # Portfolio listing (server)
│   │   ├── projectsClient.tsx      # Portfolio interactions
│   │   ├── projectDetail.tsx       # Project detail (server)
│   │   ├── projectDetailClient.tsx # Project detail (client)
│   │   └── technologyItem.tsx      # Technology badge component
│   └── ui/
│       ├── *.tsx                   # 40+ Radix-based UI primitives
│       └── shadcn-io/              # 25+ premium animated effect components
│
├── data/
│   ├── keywords.json               # Chatbot keyword-response map
│   ├── responses.json              # Chatbot pre-written responses
│   └── seed.ts                     # Database seed script
│
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── mongoose.ts                 # MongoDB connection singleton
│   ├── session.ts                  # Session helper utilities
│   ├── get-dictionary.tsx          # i18n message loader
│   └── utils.ts                    # General utility functions
│
├── messages/
│   ├── en.json                     # English translations
│   └── tr.json                     # Turkish translations
│
├── models/
│   ├── admin.ts                    # Admin user schema (Mongoose)
│   ├── blog.ts                     # Blog post schema
│   ├── projects.ts                 # Project schema
│   └── technology.ts               # Technology schema
│
├── types/                          # TypeScript type definitions & module augments
│   ├── next-auth.d.ts
│   ├── next-intl.d.ts
│   ├── nodemailer.d.ts
│   ├── bcrypt.d.ts
│   └── ...
│
├── hooks/
│   └── use-mobile.ts               # Mobile breakpoint detection hook
│
└── public/
    ├── avatar/                     # Profile photos
    ├── banner/                     # Technology logo images (WebP)
    ├── blog/                       # Blog banner images
    ├── chatbot/                    # Chatbot assistant avatar
    ├── cv/                         # CV in HTML & PDF (EN + TR)
    ├── footer/                     # Decorative footer images
    ├── logo/                       # Site logo
    ├── socialMedia/                # Social platform icons
    ├── technologies/               # Technology SVG icons (25+)
    ├── og-image.webp               # Open Graph image
    └── robots.txt                  # Search engine crawl rules
```

---

## 🗄️ Database Schema

All models are defined with Mongoose and stored in MongoDB.

### `Admin`

```
_id         ObjectId
username    String (unique)
password    String (bcrypt hashed)
createdAt   Date
```

### `Blog`

```
_id         ObjectId
title       String
content     String (rich text / HTML)
image       String (Cloudinary URL)
tags        [String]
createdAt   Date
updatedAt   Date
```

### `Project`

```
_id           ObjectId
title         String
description   String
image         String (Cloudinary URL)
liveUrl       String
githubUrl     String
technologies  [String]
featured      Boolean
createdAt     Date
```

### `Technology`

```
_id     ObjectId
name    String
icon    String (Cloudinary URL or public path)
color   String (hex)
```

---

## 🚀 Installation

### Prerequisites

- Node.js **18+**
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Cloudinary account
- Anthropic API key
- Google AI API key
- npm, yarn, pnpm, or bun

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/jhun.git
cd jhun
```

---

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI="mongodb://localhost:27017/jhun"
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/jhun

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# AI — Chatbot
ANTHROPIC_API_KEY="your-anthropic-api-key"
GOOGLE_AI_API_KEY="your-google-ai-api-key"

# Email (Gmail SMTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"

# iyzico (optional — payment features)
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

> **Gmail App Password:** In your Google account, go to Security → 2-Step Verification → App Passwords to generate a dedicated app password for Nodemailer.

---

### 4. Seed the Database

```bash
npx tsx data/seed.ts
```

This creates the default admin account and populates initial technology entries.

---

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Production Build

```bash
npm run build
npm start
```

---

## 🌍 Internationalization (i18n)

The public site is fully bilingual using `next-intl` with the App Router.

### How It Works

- All public pages live under `app/[locale]/` — e.g. `/en/blog` or `/tr/blog`
- Translation strings are stored in `messages/en.json` and `messages/tr.json`
- The `LanguageSwitcher` component updates the locale prefix in the URL at runtime
- The `LocaleProvider` wraps the app and injects the correct message bundle

### Adding Translations

1. Add new keys to both `messages/en.json` and `messages/tr.json`
2. Access them in components via `useTranslations('namespace')` from `next-intl`

### Supported Locales

| Code | Language |
| ---- | -------- |
| `en` | English  |
| `tr` | Turkish  |

---

## 🤖 AI Chatbot

The chatbot uses a two-tier response system to balance speed and quality.

### Architecture

```
User Message
     │
     ▼
Keyword Matching (data/keywords.json)
     │
     ├── Match found ──► Return pre-written response (fast)
     │
     └── No match ──► POST /api/chat
                           │
                           ├── Anthropic Claude (primary)
                           └── Google Gemini (fallback)
```

### API Route

```
POST /api/chat
Body: { message: string, history: ChatMessage[] }
Response: { reply: string }
```

### Customizing Responses

Edit `data/keywords.json` to add new keyword triggers and `data/responses.json` to define the corresponding pre-written answers for common questions about the company, services, or technologies.

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### 🔐 Authentication

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| POST   | `/api/auth/[...nextauth]` | NextAuth sign-in handler     |
| POST   | `/api/auth/logout`        | Destroy session and sign out |

### 📝 Blog

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/blog`      | List all blog posts      |
| POST   | `/api/blog`      | Create blog post (Admin) |
| GET    | `/api/blog/[id]` | Get blog post by ID      |
| PUT    | `/api/blog/[id]` | Update blog post (Admin) |
| DELETE | `/api/blog/[id]` | Delete blog post (Admin) |

### 🖥️ Projects

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/projects`      | List all projects      |
| POST   | `/api/projects`      | Create project (Admin) |
| GET    | `/api/projects/[id]` | Get project by ID      |
| PUT    | `/api/projects/[id]` | Update project (Admin) |
| DELETE | `/api/projects/[id]` | Delete project (Admin) |

### ⚙️ Technologies

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/api/technology`      | List all technologies     |
| POST   | `/api/technology`      | Add technology (Admin)    |
| GET    | `/api/technology/[id]` | Get technology by ID      |
| PUT    | `/api/technology/[id]` | Update technology (Admin) |
| DELETE | `/api/technology/[id]` | Delete technology (Admin) |

### 🤖 Chatbot & Utilities

| Method | Endpoint      | Description                       |
| ------ | ------------- | --------------------------------- |
| POST   | `/api/chat`   | Send message to AI chatbot        |
| POST   | `/api/mail`   | Submit contact form (sends email) |
| POST   | `/api/upload` | Upload image to Cloudinary        |

---

## 🔐 Security

- **NextAuth.js** — Admin sessions with encrypted JWT stored in HttpOnly cookies
- **bcrypt** — Admin password hashing (salt rounds: 12)
- **Zod** — Schema validation on all API route inputs
- **Protected admin routes** — Middleware checks for valid session before rendering `/admin/*`
- **Cloudinary signed uploads** — All upload requests use server-generated signatures
- **Environment variable isolation** — API keys and secrets never exposed to the client bundle
- **robots.txt** — Configured to manage search engine crawl scope

---

## 🎨 CV & Resume

The project includes a downloadable CV for the lead developer in two languages and two formats:

| Format | English                                                   | Turkish                                                   |
| ------ | --------------------------------------------------------- | --------------------------------------------------------- |
| HTML   | `public/cv/cv.en.html`                                    | `public/cv/cv.tr.html`                                    |
| PDF    | `public/cv/Ceyhun Türkmen – Full Stack Developer(en).pdf` | `public/cv/Ceyhun Türkmen – Full Stack Developer(tr).pdf` |

Both are available for direct download from the site.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Deploy — Vercel automatically detects Next.js and configures the build

```bash
# Or deploy via CLI
npx vercel --prod
```

### Railway

1. Connect your GitHub repository in the Railway dashboard
2. Add environment variables
3. Railway auto-detects Node.js and runs `npm run build && npm start`

### Docker

```bash
# Build the image
docker build -t jhun .

# Run the container
docker run -p 3000:3000 --env-file .env jhun
```

### Production Checklist

- Set `NODE_ENV=production`
- Update `NEXTAUTH_URL` to your production domain
- Use a MongoDB Atlas cluster (not local MongoDB)
- Configure Cloudinary for the production environment
- Set `NEXT_PUBLIC_BASE_URL` to your live domain
- Verify `robots.txt` allows the correct crawl paths
- Enable HTTPS (automatic on Vercel, use Let's Encrypt for VPS)

---

## 🤝 Contributing

1. **Fork** this repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'feat: add AmazingFeature'
   ```
4. Push your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a **Pull Request**

### Development Standards

- Use **TypeScript** — avoid `any`, type all props and API responses
- Follow **component isolation** — server vs. client components clearly separated
- Use **Conventional Commits** — `feat:`, `fix:`, `docs:`, `refactor:`
- Run `next build` before submitting PRs to catch type errors

---

## 👥 Developer

| Name           | Role                 | Contact                                                         |
| -------------- | -------------------- | --------------------------------------------------------------- |
| Ceyhun Türkmen | Full Stack Developer | [jhuntechofficial@gmail.com](mailto:jhuntechofficial@gmail.com) |

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

- 🌐 Website: [jhun.com.tr](https://jhun.com.tr)
- 📧 Email: [jhuntechofficial@gmail.com](mailto:jhuntechofficial@gmail.com)

---

<div align="center">

_.jhun{} — crafting the web, one project at a time._ 💻

</div>
