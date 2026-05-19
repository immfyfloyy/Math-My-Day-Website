# Math My Day — Web Application

> A modern, gamified math-learning platform for Thai students.
> *(แพลตฟอร์มการเรียนรู้คณิตศาสตร์ที่ใช้ AI + เกม สำหรับนักเรียนไทย)*

Built with **TanStack Start** (React 19 + SSR), **TypeScript**, **Tailwind CSS v4**, and **Nitro** server adapter.

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Quick Start](#quick-start)
5. [Available Scripts](#available-scripts)
6. [Routes](#routes)
7. [Architecture](#architecture)
8. [Authentication Flow](#authentication-flow)
9. [Styling System](#styling-system)
10. [Development Notes](#development-notes)
11. [Deployment](#deployment)
12. [Roadmap](#roadmap)

---

## About the Project

**Math My Day** is a Thai-language math-learning web application designed to make mathematics
fun and accessible. Key features include:

- **AI Tutor** — personalized recommendations based on student level
  *(ระบบ AI แนะนำบทเรียนตามระดับของผู้เรียน)*
- **Math Games** — gamified practice (e.g. Math 24 Challenge)
  *(เรียนรู้ผ่านเกม เช่น Math 24)*
- **Live Classes** — interactive sessions with real teachers
  *(คลาสสดกับครูตัวจริง พร้อม whiteboard และ screen share)*
- **Progress Tracking** — real-time dashboards for students and parents
  *(ติดตามพัฒนาการแบบ real-time)*
- **Member Subscription** — 69 THB/month tier with unlimited Q&A via Line OA
  *(สมาชิกรายเดือน 69 บาท ถามโจทย์ได้ไม่จำกัด)*

---

## Tech Stack

| Layer | Technology | Purpose *(ภาษาไทย)* |
|---|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) | Full-stack React framework with SSR *(เฟรมเวิร์ก React แบบ full-stack)* |
| UI Library | React 19 | Component-based UI *(สร้าง UI ด้วย component)* |
| Language | TypeScript 6 (strict) | Type safety *(ภาษามี type ป้องกัน bug)* |
| Routing | [TanStack Router](https://tanstack.com/router) | File-based routing + type-safe links *(จัดการ URL แบบ file-based)* |
| Data Fetching | [TanStack Query](https://tanstack.com/query) | Server state, caching, mutations *(จัดการ state จาก server + cache)* |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + legacy CSS | Utility-first + design system *(ระบบ CSS แบบ utility-first)* |
| Server Adapter | [Nitro](https://nitro.build/) | Universal Node-compatible build *(สร้าง server ที่ deploy ได้หลาย platform)* |
| Auth (hashing) | bcryptjs | Password hashing (10 salt rounds) *(เข้ารหัส password)* |
| Build Tool | Vite 8 | Dev server + bundler *(เครื่องมือ build เร็วมาก)* |
| Testing | Vitest 4 + Testing Library | Unit & component tests *(ทดสอบโค้ด)* |
| Icons | Font Awesome 6 + lucide-react | Icon library *(ไอคอน)* |
| Fonts | Kanit + Space Grotesk (Google Fonts) | Thai + English typography |

---

## Project Structure

```text
AI_MMD_Web/
├── public/                      # Static assets served as-is
│                                # (ไฟล์ static เช่น รูป favicon ที่ serve ตรง ๆ)
│   ├── img/                     # Logos & images (ใช้ใน <img src="/img/...">)
│   ├── favicon.ico
│   ├── logo192.png, logo512.png # PWA icons
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # Search engine rules
│
├── src/                         # Application source code (โค้ดทั้งหมด)
│   ├── router.tsx               # TanStack Router setup + SSR Query bridge
│   │                            # (ตั้งค่า Router หลัก + เชื่อม TanStack Query)
│   ├── routeTree.gen.ts         # AUTO-GENERATED — do NOT edit manually
│   │                            # (ไฟล์ที่ Router สร้างอัตโนมัติ ห้ามแก้มือ)
│   │
│   ├── routes/                  # File-based routes (1 file = 1 URL)
│   │                            # (1 ไฟล์ = 1 URL)
│   │   ├── __root.tsx           # Root layout (head, fonts, devtools)
│   │   │                        # (Layout ครอบทุกหน้า)
│   │   ├── index.tsx            # Home page "/"
│   │   ├── signup.tsx           # Signup page "/signup"
│   │   └── api/auth/signup.ts   # API endpoint POST /api/auth/signup
│   │                            # (API ฝั่ง server สำหรับสมัครสมาชิก)
│   │
│   ├── features/                # Feature-based modules (โมดูลแยกตามฟีเจอร์)
│   │   ├── home/                # Landing-page sections
│   │   │   ├── components/      # Hero, Features, Portfolio, Courses, CTA
│   │   │   ├── data/            # Static data arrays (เนื้อหา/ข้อความ)
│   │   │   └── index.ts         # Barrel export (รวม export ออกที่เดียว)
│   │   │
│   │   └── auth/                # Authentication feature (สมัครสมาชิก)
│   │       ├── components/      # SignupPage, SignupForm, SignupBenefits
│   │       ├── data/            # Benefits, stats, education levels
│   │       ├── hooks/           # useSignupForm, useSignupMutation
│   │       ├── services/        # auth.api.ts (fetch /api/auth/signup)
│   │       ├── types/           # Shared client/server contracts
│   │       │                    # (Type ใช้ร่วมกันระหว่าง client กับ server)
│   │       ├── utils/           # validation, phoneFormat
│   │       └── index.ts
│   │
│   ├── shared/                  # Cross-cutting code (โค้ดใช้ร่วมหลาย feature)
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer, MainLayout, AnimatedBackground
│   │   │   └── ui/              # (reserved — ยังไม่ได้ใช้)
│   │   ├── hooks/               # useCountUp, useDragScroll
│   │   ├── server/              # Server-only code (ห้าม import ฝั่ง client)
│   │   │   ├── password.ts      # bcrypt hash/verify
│   │   │   └── users.store.ts   # In-memory user store (DEV ONLY)
│   │   │                        # (เก็บ user ใน memory แค่ตอน dev)
│   │   └── styles/              # globals.css, legacy.css, signup.css
│   │
│   └── integrations/
│       └── tanstack-query/      # QueryClient + devtools panel
│
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config + path aliases
│                                # (ตั้งค่า TS + alias เช่น @shared/*)
├── vite.config.ts               # Vite plugins (Nitro, Tailwind, React)
├── .gitignore                   # Files git should ignore
├── .cta.json                    # create-tanstack-app metadata (ไม่ใช้ runtime)
└── README.md                    # คุณกำลังอ่านอยู่นี่
```

---

## Quick Start

### Prerequisites *(สิ่งที่ต้องมีก่อน)*

- **Node.js** ≥ 20 (recommended: latest LTS) *(ติดตั้ง Node.js เวอร์ชัน 20 ขึ้นไป)*
- **npm** (or pnpm/yarn — pnpm is preferred per `package.json`)

### Install & Run

```bash
# 1. Install dependencies (ติดตั้ง package ทั้งหมด — ทำครั้งแรกครั้งเดียว)
npm install

# 2. Start the dev server (รัน dev server พร้อม hot-reload)
npm run dev

# 3. Open your browser at:
#    http://localhost:3000
#    (เปิดเบราว์เซอร์ดูผลลัพธ์)
```

The dev server runs on **port 3000** by default *(ตั้งไว้ที่ port 3000 — แก้ได้ที่ `package.json`)*.

---

## Available Scripts

| Command | Description *(ภาษาไทย)* |
|---|---|
| `npm run dev` | Start Vite dev server with HMR on port 3000 *(รัน dev server)* |
| `npm run build` | Build for production into `.output/` *(build เพื่อ deploy)* |
| `npm run preview` | Preview the production build locally *(ดู production build)* |
| `npm run test` | Run Vitest test suite *(รัน test)* |

---

## Routes

| URL | File | Method | Purpose *(หน้าที่)* |
|---|---|---|---|
| `/` | [src/routes/index.tsx](src/routes/index.tsx) | GET | Landing page *(หน้าแรก)* |
| `/signup` | [src/routes/signup.tsx](src/routes/signup.tsx) | GET | Signup page UI *(หน้าสมัครสมาชิก)* |
| `/api/auth/signup` | [src/routes/api/auth/signup.ts](src/routes/api/auth/signup.ts) | POST | Create new user *(API สมัครสมาชิก)* |

### Adding a new route *(เพิ่มหน้าใหม่)*

Create a file in `src/routes/`. TanStack Router will auto-generate
`routeTree.gen.ts` on the next dev-server tick.
*(สร้างไฟล์ใน `src/routes/` — Router จะ generate `routeTree.gen.ts` ให้อัตโนมัติ)*

```tsx
// Example: src/routes/about.tsx → URL "/about"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div>About us</div>,
})
```

---

## Architecture

### Feature-based Folder Structure *(แบ่งโฟลเดอร์ตามฟีเจอร์)*

Each feature in `src/features/<name>/` is **self-contained** with its own:

- `components/` — UI building blocks *(ส่วนประกอบ UI)*
- `hooks/` — React hooks specific to the feature *(hook ของฟีเจอร์)*
- `services/` — API client calls *(เรียก API)*
- `types/` — TypeScript types & API contracts *(ประเภทข้อมูล)*
- `data/` — static content arrays *(ข้อมูลคงที่ เช่น text, list)*
- `utils/` — pure helper functions *(ฟังก์ชันช่วย)*
- `index.ts` — barrel export *(รวม export)*

This keeps related code **co-located** and makes features easy to delete or extract.
*(โค้ดที่เกี่ยวข้องกันอยู่ในโฟลเดอร์เดียว ลบหรือย้ายง่าย)*

### Path Aliases *(ทางลัดของ import)*

Configured in [tsconfig.json](tsconfig.json) and [package.json](package.json):

```ts
import { MainLayout }    from '@shared/components/layout'   // → src/shared/...
import { SignupPage }    from '@features/auth'              // → src/features/auth
import signupCss         from '@shared/styles/signup.css?url'
```

### Server vs. Client Code *(แยกโค้ด server กับ client)*

- **`src/shared/server/`** — code that runs **only on the server** (e.g. bcrypt, DB)
  *(โค้ดที่รันเฉพาะฝั่ง server เท่านั้น — ห้าม import จาก client)*
- **`src/routes/api/**`** — server endpoints (request → JSON response)
  *(API endpoint แบบ REST)*
- Everything else can run on **both** server (SSR) and client.
  *(ส่วนอื่นรันได้ทั้ง 2 ฝั่ง)*

---

## Authentication Flow

The signup flow demonstrates the end-to-end pattern used throughout the app
*(flow การสมัครสมาชิก — ใช้เป็นแม่แบบสำหรับฟีเจอร์อื่น)*:

```
┌──────────────────────┐
│  SignupForm.tsx      │  User fills form (กรอกฟอร์ม)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  useSignupForm       │  State + validation + format phone
│  (custom hook)       │  (จัดการ state + ตรวจฟอร์ม + format เบอร์)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  useSignupMutation   │  TanStack Query useMutation
│  (custom hook)       │  (ห่อด้วย useMutation)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  signup() in         │  fetch('/api/auth/signup', POST)
│  auth.api.ts         │  Throws AuthApiError on failure
└──────────┬───────────┘
           │  HTTP POST
           ▼
┌──────────────────────┐
│  api/auth/signup.ts  │  Server-side handler
│                      │  - Validate input (ตรวจข้อมูล)
│                      │  - Check duplicate email (เช็ค email ซ้ำ)
│                      │  - hashPassword via bcrypt (เข้ารหัสด้วย bcrypt)
│                      │  - createUser → in-memory Map
│                      │  - Return 201 { user: {...} }
└──────────┬───────────┘
           │
           ▼
   ┌───────────────┐
   │ Show alert    │  Success → redirect to "/" after 1.5s
   │               │  Error   → display Thai error message
   └───────────────┘
```

### Key files involved *(ไฟล์ที่เกี่ยวข้อง)*

| File | Role |
|---|---|
| [SignupForm.tsx](src/features/auth/components/SignupForm.tsx) | Form UI with show-password toggle *(UI ของฟอร์ม)* |
| [useSignupForm.ts](src/features/auth/hooks/useSignupForm.ts) | Form state + submit handler *(จัดการ state + submit)* |
| [useSignupMutation.ts](src/features/auth/hooks/useSignupMutation.ts) | Wraps `signup()` in TanStack Query mutation |
| [auth.api.ts](src/features/auth/services/auth.api.ts) | HTTP client + `AuthApiError` class |
| [validation.ts](src/features/auth/utils/validation.ts) | Client-side input validation |
| [phoneFormat.ts](src/features/auth/utils/phoneFormat.ts) | Format phone as `xxx-xxx-xxxx` |
| [auth.types.ts](src/features/auth/types/auth.types.ts) | **Shared** request/response types *(type ใช้ทั้ง 2 ฝั่ง)* |
| [api/auth/signup.ts](src/routes/api/auth/signup.ts) | Server endpoint |
| [server/password.ts](src/shared/server/password.ts) | bcrypt hash/verify |
| [server/users.store.ts](src/shared/server/users.store.ts) | In-memory user storage |

---

## Styling System

The app uses a **hybrid** approach: Tailwind utilities + a legacy custom CSS design system.
*(ใช้ Tailwind คู่กับ CSS เดิมที่ออกแบบไว้)*

```
src/shared/styles/
├── globals.css   # Entry CSS — imported in __root.tsx
│                 # @import "tailwindcss" + legacy.css + base reset
│                 # (ไฟล์หลัก รวม Tailwind + legacy)
│
├── legacy.css    # ~42 KB — custom design system from the static HTML era
│                 # Defines all section styles (.hero-modern, .feature-card, ฯลฯ)
│                 # (สไตล์เดิมจากเวอร์ชัน static — ยังใช้อยู่)
│
└── signup.css    # ~10 KB — loaded only on /signup route
                  # (โหลดเฉพาะหน้า signup เท่านั้น)
```

The `signup.css` is route-scoped via TanStack Router's `links` option,
so it ships only when the user visits `/signup`.
*(โหลด CSS แบบ lazy — เฉพาะหน้าที่ต้องใช้)*

---

## Development Notes

### ⚠️ In-Memory User Store

Currently [users.store.ts](src/shared/server/users.store.ts) uses a `Map`
that lives in process memory:

- **Data is lost on server restart** *(ข้อมูลหายเมื่อ restart server)*
- **Not shared across processes** *(ไม่ sync ระหว่าง process)*
- **Suitable for development only** *(ใช้ได้แค่ตอน dev)*

A real database (PostgreSQL/MySQL/MongoDB) should replace this before production.
*(ต้องเปลี่ยนเป็น DB จริงก่อน deploy production)*

### Thai-first Localization

All UI copy is in Thai. The `<html lang="th">` is set in
[__root.tsx](src/routes/__root.tsx). The Kanit font is loaded for proper
Thai glyph rendering.
*(UI เป็นภาษาไทย ใช้ font Kanit รองรับการแสดงผลภาษาไทย)*

### TypeScript Strictness

`tsconfig.json` enables:
- `strict: true`
- `noUnusedLocals: true` *(ห้ามมีตัวแปรที่ไม่ได้ใช้)*
- `noUnusedParameters: true` *(ห้ามมี parameter ที่ไม่ได้ใช้)*
- `verbatimModuleSyntax: true` — must use `import type` for type-only imports
  *(ต้องใช้ `import type` ตอน import เฉพาะ type)*

### Devtools

When running `npm run dev`, you'll see a **devtools panel** in the bottom-right
corner with two tabs:

- **TanStack Router** — inspect route tree, params, loader data
  *(ดู route, params, loader)*
- **TanStack Query** — inspect query/mutation cache
  *(ดู cache ของ query/mutation)*

---

## Deployment

The project uses **Nitro** as a universal server adapter.
*(ใช้ Nitro รัน server ได้บนหลาย platform)*

### Build

```bash
npm run build
```

Output is written to `.output/` (a self-contained Node server).
*(ผลลัพธ์อยู่ในโฟลเดอร์ `.output/` รันเป็น Node server ได้เลย)*

### Run in production

```bash
node .output/server/index.mjs
```

### Deploy targets *(แพลตฟอร์มที่ deploy ได้)*

Nitro supports presets for:
- Vercel, Netlify, Cloudflare Workers
- AWS Lambda, Azure Functions
- Render, Fly.io, Railway
- Any Node-compatible VPS

See <https://nitro.build/deploy> for preset-specific tuning.

---

## Roadmap

Suggested next steps *(สิ่งที่ควรทำต่อ)*:

- [ ] Replace in-memory user store with a real database (Prisma + PostgreSQL recommended)
      *(เปลี่ยนเป็น DB จริง)*
- [ ] Add login route (`/login` + `POST /api/auth/login`)
      *(เพิ่มหน้า login)*
- [ ] Implement session/JWT auth middleware
      *(เพิ่มระบบ session/JWT)*
- [ ] Add `/courses`, `/classroom`, `/dashboard` pages (originally in `_legacy/`)
      *(migrate หน้า classroom + dashboard จากของเดิม)*
- [ ] Connect Line OA integration for member Q&A
      *(เชื่อม Line OA สำหรับสมาชิก)*
- [ ] Add real payment gateway for Member subscription
      *(เชื่อมระบบจ่ายเงิน)*
- [ ] Add unit + integration tests (Vitest is already configured)
      *(เขียน test ให้ครอบคลุม)*
- [ ] Set up CI/CD (GitHub Actions)
      *(ตั้งค่า CI/CD)*

---

## License

Private project — © 2024 Math My Day. All rights reserved.
*(โปรเจกต์ส่วนบุคคล สงวนลิขสิทธิ์)*

---

## Useful Links

- [TanStack Start docs](https://tanstack.com/start)
- [TanStack Router docs](https://tanstack.com/router)
- [TanStack Query docs](https://tanstack.com/query)
- [Tailwind CSS v4 docs](https://tailwindcss.com/)
- [Nitro deployment presets](https://nitro.build/deploy)
