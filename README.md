# Replicast AI Hero UI

A Next.js 16 marketing website showcasing holographic AI digital humans for enterprise customer experience. Features a real-time 3D avatar rendered with Three.js, browser-native text-to-speech demo, and modern UI with HeroUI + Tailwind CSS.

**This is a pure frontend project** - no backend server required.

---

## New Here? Start Here

This is a **static marketing site** that demonstrates Replicast AI's holographic digital human technology. 

### What does "static site" mean?

Unlike traditional web apps that need a server running 24/7, this site is **pre-built** into plain HTML, CSS, and JavaScript files. These files can be hosted on any web server (GitHub Pages, Netlify, etc.) without any server-side code running.

### What the site includes:

This is a **single-page landing site** with the following sections:

| Section | Description |
|---------|-------------|
| **Hero** | Eye-catching header with kiosk image and CTAs |
| **About** | Interactive 3D avatar in a virtual kiosk frame |
| **Features** | Key capabilities of the AI digital humans |
| **Contact** | Demo request form with TTS-enabled avatar |

---

## Tech Stack

| Layer | Technology | Why we use it |
|-------|------------|---------------|
| **Framework** | Next.js 16 (App Router) | React framework with file-based routing and static export |
| **Language** | TypeScript 7 | JavaScript with types - catches bugs before runtime |
| **Runtime** | React 19 | Latest React with improved performance |
| **UI Components** | HeroUI v2.8 | Pre-built accessible React components |
| **Styling** | Tailwind CSS 3.4 | Utility classes like `bg-blue-500` instead of writing CSS |
| **3D Rendering** | React Three Fiber 9 | React wrapper for Three.js (3D graphics library) |
| **Animations** | Framer Motion 12 | Declarative animations for React |
| **Forms** | React Hook Form + Zod | Form state management + validation |
| **TTS** | Web Speech API | Built-in browser text-to-speech (no backend needed!) |
| **Testing** | Vitest / Jest | Fast unit testing with coverage |
| **Linting** | ESLint 9 | Catches code quality issues |
| **Formatting** | Prettier | Auto-formats code for consistency |
| **Container** | Docker + Nginx | Production deployment via GHCR |

---

## Prerequisites

Before you start, make sure you have:

1. **Node.js 24+** - JavaScript runtime
   ```bash
   node -v  # Should show v24.x.x or higher
   ```

2. **npm 10+** - Package manager (comes with Node.js)
   ```bash
   npm -v   # Should show 10.x.x or higher
   ```

**Don't have Node.js?** Download from [nodejs.org](https://nodejs.org/) (LTS version recommended).

---

## Getting Started

### Step 1: Navigate to the project

```bash
cd replicast-ai-hero-ui
```

### Step 2: Install dependencies

This downloads all the packages listed in `package.json`:

```bash
npm install
```

**What's happening?** npm reads `package.json`, downloads packages from the npm registry, and puts them in `node_modules/`.

### Step 3: Start the development server

```bash
npm run dev
```

**What's happening?** Next.js starts a local server with hot-reload - when you save a file, the browser auto-refreshes.

### Step 4: Open in browser

Go to [http://localhost:3000](http://localhost:3000)

You should see the Replicast AI homepage with the 3D avatar!

---

## Available Scripts

Run these from the terminal in the project directory:

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts dev server at localhost:3000 with hot-reload |
| `npm run build` | Creates production build in `out/` folder |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Checks code for errors/warnings |
| `npm run lint:fix` | Fixes auto-fixable lint errors |
| `npm run format` | Formats all code with Prettier |
| `npm run format:check` | Checks if code is formatted |
| `npm run typecheck` | Runs TypeScript compiler to check for type errors |
| `npm test` | Runs Vitest in watch mode |
| `npm run test:ci` | Runs Vitest with coverage (for CI) |
| `npm run test:watch` | Runs Vitest in watch mode |
| `npm run test:jest` | Runs Jest (alternative test runner) |
| `npm run test:jest:ci` | Runs Jest with coverage |
| `npm run clean` | Deletes `out/`, `.next/`, `coverage/`, and caches |

### Which scripts do I use most?

- **Daily development**: `npm run dev`
- **Running tests**: `npm test` (Vitest in watch mode)
- **Before committing**: `npm run lint` and `npm run format`
- **Before deploying**: `npm run build` (the CI does this automatically)

### Testing Framework Choice

This project supports **two test runners**:

| Framework | Command | When to use |
|-----------|---------|-------------|
| **Vitest** (default) | `npm test` | Faster, native ESM support, better for Vite/Next.js |
| **Jest** | `npm run test:jest` | Legacy support, mature ecosystem |

Both use the same test files in `src/__tests__/` and `@testing-library/react`.

---

## Project Structure

Here's what each folder does:

```
replicast-ai-hero-ui/
│
├── 📁 public/                     # Static files served as-is
│   ├── models/avatar/             # 3D model (GLTF) for TTS demo
│   ├── models/Marina/             # 3D model (OBJ) for About section
│   ├── images/                    # Logos, OG images
│   └── favicon.ico                # Browser tab icon
│
├── 📁 src/                        # All source code lives here
│   │
│   ├── 📁 app/                    # Single-page app
│   │   ├── layout.tsx             # Root layout (header, footer)
│   │   ├── page.tsx               # Homepage (/)
│   │   ├── globals.css            # Global styles
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── 📁 components/             # REUSABLE UI PIECES
│   │   ├── avatar/                # 3D avatar components
│   │   ├── common/                # Shared components (ErrorBoundary, Forms)
│   │   ├── layout/                # Header, Footer, Providers
│   │   ├── sections/              # Homepage sections (Hero, About, etc.)
│   │   └── ui/                    # Basic UI elements (Button, Card, Input)
│   │
│   ├── 📁 content/                # DATA - no React code, just data
│   │   ├── siteConfig.ts          # Site name, URLs, nav links
│   │   ├── avatar.ts              # Avatar configuration
│   │   ├── features.ts            # Feature cards data
│   │   └── testimonials.ts        # Customer quotes
│   │
│   ├── 📁 types/                  # TypeScript type definitions
│   │   └── *.ts                   # Interfaces like Industry, Feature, etc.
│   │
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── useMediaQuery.ts       # Check screen size
│   │   └── useScrollPosition.ts   # Track scroll position
│   │
│   ├── 📁 constants/              # App-wide constants
│   │   └── index.ts               # Breakpoints, routes, z-index values
│   │
│   └── 📁 lib/                    # Utility functions
│       ├── utils.ts               # cn() for className merging
│       ├── animations.ts          # Framer Motion presets
│       └── theme.ts               # Color constants
│
├── 📁 .github/workflows/          # CI/CD automation
│   └── deploy.yml                 # GitHub Actions pipeline
│
├── 📁 src/__tests__/              # Test files
│   ├── smoke.test.ts              # Basic sanity tests
│   └── utils.test.ts              # Utility function tests
│
├── 📄 .env.example                # Template for environment variables
├── 📄 eslint.config.mjs           # ESLint 9 flat config
├── 📄 .prettierrc                 # Prettier formatting rules
├── 📄 .gitignore                  # Files Git should ignore
├── 📄 Dockerfile                  # Docker build for AWS/production
├── 📄 nginx.conf                  # Nginx config for Docker
├── 📄 jest.config.js              # Jest configuration (alternative runner)
├── 📄 vitest.config.ts            # Vitest configuration (primary runner)
├── 📄 next.config.js              # Next.js settings
├── 📄 tailwind.config.ts          # Tailwind CSS customization
├── 📄 tsconfig.json               # TypeScript settings
└── 📄 package.json                # Dependencies and scripts
```

### Key concepts:

- **`app/` folder** = Single page at `/` with all sections
- **`components/` folder** = Reusable pieces. Import them wherever needed.
- **`content/` folder** = Data only. Edit these to change site text without touching React code.

---

## Environment Variables

Environment variables let you configure the app without changing code.

### Setup:

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your values

### Available variables:

| Variable | What it does | When you need it |
|----------|--------------|------------------|
| `NEXT_PUBLIC_BASE_PATH` | URL prefix for subdirectory hosting | GitHub Pages (set by CI) |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID | To make contact form work |
| `NEXT_PUBLIC_SITE_URL` | Full site URL | For SEO meta tags |
| `NEXT_PUBLIC_APP_VERSION` | Version number | Set by CI from git tag |

**Note**: `NEXT_PUBLIC_` prefix means the variable is exposed to the browser. Never put secrets here!

---

## How Things Work

### The 3D Avatar

Located in the hero section, the avatar uses:

1. **React Three Fiber** - Lets us use Three.js with React syntax
2. **GLTF model** - 3D model format, loaded from `public/models/avatar/`
3. **Animations** - Breathing effect, gentle swaying

**File**: `src/components/avatar/HolographicAvatar.tsx`

### Text-to-Speech Demo

Uses the **Web Speech API** - a browser built-in feature:

```javascript
// Simplified example of how it works:
const utterance = new SpeechSynthesisUtterance("Hello world");
speechSynthesis.speak(utterance);
```

- **No backend needed** - runs entirely in the browser
- **Voice options** - uses whatever voices your OS has installed
- Works in Chrome, Edge, Safari, Firefox

**File**: `src/components/common/TTSDemo.tsx`

### Static Export

When you run `npm run build`, Next.js:

1. Pre-renders all pages to HTML
2. Bundles JavaScript
3. Optimizes CSS
4. Outputs everything to `out/` folder

This `out/` folder can be deployed to any static host.

---

## CI/CD Pipeline

The project uses **GitHub Actions** for comprehensive continuous integration and deployment.

### What is CI/CD?

- **CI (Continuous Integration)**: Automatically run tests/checks when code changes
- **CD (Continuous Deployment)**: Automatically deploy when checks pass

### Pipeline Overview

```
   ┌─────────────────┐   ┌─────────────────┐
   │  Lint & Format  │   │   Unit Tests    │  ← Stage 1 (parallel)
   └────────┬────────┘   └────────┬────────┘
            │                     │
            └──────────┬──────────┘
                       ▼
   ┌─────────────────┐   ┌─────────────────┐
   │  Build Artifact │   │  Security Scan  │  ← Stage 2 (parallel)
   └────────┬────────┘   └────────┬────────┘
            │                     │
            └──────────┬──────────┘
                       ▼
            ┌─────────────────┐
            │  Docker Build   │               ← Stage 3
            └────────┬────────┘
                     ▼
            ┌─────────────────┐
            │   Trivy Scan    │               ← Stage 4 (tag-only)
            └────────┬────────┘
                     ▼
            ┌─────────────────┐
            │  Deploy Pages   │               ← Stage 5 (tag-only)
            └────────┬────────┘
                     ▼
            ┌─────────────────┐
            │  Verify Deploy  │               ← Stage 6 (tag-only)
            └────────┬────────┘
                     ▼
            ┌─────────────────┐
            │   OWASP ZAP     │               ← Stage 7 (tag-only)
            └────────┬────────┘
                     ▼
            ┌─────────────────┐
            │  CI Summary     │               ← Stage 8 (always)
            └─────────────────┘
```

### Stage-by-Stage Breakdown

| Stage | Job | What it does | When |
|-------|-----|--------------|------|
| **1A** | Lint & Format | TypeScript check, Prettier, ESLint, SARIF reports | Always |
| **1B** | Unit Tests | Vitest with coverage | Always |
| **2A** | Build Artifact | Next.js static export to `out/` | After Stage 1 |
| **2B** | Security Scan | Snyk OSS vulnerability scan | After Stage 1 |
| **3** | Docker Build | Build & push image to GHCR | After Stage 2 |
| **4** | Trivy Scan | Container vulnerability scan | Tag only |
| **5** | Deploy Pages | Deploy to GitHub Pages + health check + Playwright smoke test | Tag only |
| **6** | Verify Tag | Confirm `<meta name="app-version">` matches tag | Tag only |
| **7** | OWASP ZAP | Dynamic security scan on production | Tag only |
| **8** | CI Summary | Generate report with all job results | Always |

### When Does Each Stage Run?

| Trigger | Stages | Description |
|---------|--------|-------------|
| **Pull Request** | 1-3 | Lint, tests, build, security, Docker |
| **Push to main** | 1-3 | Same as PR |
| **Tag push (v*)** | 1-8 | Full pipeline including deploy + security scans |

### Deployment Workflow

1. Make your changes and push to `main`
2. Create a version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. GitHub Actions automatically:
   - Runs all quality checks
   - Builds Docker image (for AWS deployment)
   - Scans for vulnerabilities (Snyk + Trivy)
   - Deploys to GitHub Pages
   - Runs Playwright smoke test
   - Verifies deployed version
   - Runs OWASP ZAP security scan
   - Auto-rollback if health check fails

### Required Secrets (Optional)

| Secret | Purpose | Required? |
|--------|---------|-----------|
| `SNYK_TOKEN` | Snyk vulnerability scanning | Optional (falls back to `npm audit`) |
| `GITHUB_TOKEN` | Provided automatically | Auto |

### Repository Variables (Optional)

| Variable | Purpose | Default |
|----------|---------|---------|
| `ENABLE_CODE_SCANNING_SARIF` | Upload SARIF to GitHub Code Scanning | `false` |

### Docker Deployment (AWS)

The pipeline builds a Docker image and pushes to GitHub Container Registry (GHCR):

```bash
# Pull the image
docker pull ghcr.io/maugus0/replicast-ai-hero-ui:latest

# Run locally
docker run -p 8080:80 ghcr.io/maugus0/replicast-ai-hero-ui:latest
```

The image uses Nginx to serve the static Next.js export with:
- Gzip compression
- Security headers
- SPA-style routing
- Health check endpoint at `/health`

### Pipeline file:

Located at `.github/workflows/deploy.yml` - heavily commented for learning!

---

## Code Quality Tools

### ESLint (finds bugs)

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix what's possible
```

ESLint 9 uses the new **flat config** format in `eslint.config.mjs`. It checks for:
- Unused variables
- Missing dependencies in hooks
- TypeScript type issues
- React best practices
- Next.js specific rules

### Prettier (formats code)

```bash
npm run format        # Format all files
npm run format:check  # Check if formatted
```

Prettier rules are in `.prettierrc`. It handles:
- Indentation (2 spaces)
- Quotes (single quotes)
- Semicolons (none)
- Line length (100 chars)

### TypeScript (type checking)

```bash
npm run typecheck     # Check types
```

Catches bugs like:
- Passing wrong types to functions
- Accessing properties that don't exist
- Missing required props

### Testing (Vitest / Jest)

```bash
npm test              # Vitest in watch mode
npm run test:ci       # Vitest with coverage (for CI)
npm run test:jest     # Jest (alternative)
```

Test files are in `src/__tests__/` and use:
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM matchers
- Coverage reporting with v8 (Vitest) or Istanbul (Jest)

---

## Common Tasks

### Add a new page

1. Create folder in `src/app/`:
   ```
   src/app/pricing/page.tsx
   ```

2. Add your component:
   ```tsx
   export default function PricingPage() {
     return <div>Pricing content here</div>
   }
   ```

3. Page is now available at `/pricing`

### Change site text

Edit files in `src/content/`:

- **Features** → `features.ts`
- **Avatar config** → `avatar.ts`
- **Site settings** → `siteConfig.ts`

### Add a new component

1. Create the file:
   ```
   src/components/ui/Badge.tsx
   ```

2. Export from index:
   ```typescript
   // src/components/ui/index.ts
   export { Badge } from './Badge'
   ```

3. Use it:
   ```tsx
   import { Badge } from '@/components/ui'
   ```

---

## Troubleshooting

### "Module not found" error

```bash
npm run clean && npm install
```

### TypeScript errors in VS Code but build works

Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### TTS demo says "not supported"

Your browser doesn't support Web Speech API. Try Chrome, Edge, or Safari.

### Build fails

1. Check for lint errors: `npm run lint`
2. Check for type errors: `npm run typecheck`
3. Check the error message - it usually tells you the file and line

### 3D avatar not loading

- Check browser console for errors
- Ensure `public/models/avatar/` folder exists with model files
- Try a different browser (WebGL support varies)

---

## Good First Files to Read

If you're learning the codebase, start here:

1. `src/app/page.tsx` - Homepage, shows how sections compose
2. `src/components/ui/Button.tsx` - Simple component example
3. `src/content/features.ts` - How data is structured
4. `src/components/sections/ContactCTA.tsx` - Interactive component with TTS
5. `.github/workflows/deploy.yml` - CI/CD pipeline (heavily commented!)

---

## License

MIT License - see LICENSE file for details.
