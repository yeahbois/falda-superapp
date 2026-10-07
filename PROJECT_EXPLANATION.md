# Falda SuperApp — Architectural Audit & Repository Guide

## Executive Project Summary

**Falda SuperApp** (`falda-superapp`) is a universal cross-platform application designed to run from a single TypeScript/React Native codebase across **6 target platforms**: **iOS**, **Android**, **Web**, **Windows**, **macOS**, and **Linux**.

### Core Architecture & Design Patterns
- **Mobile Native (iOS & Android):** Powered by **Expo SDK 52 / React Native 0.76** utilizing **Continuous Native Generation (CNG)** via Expo Prebuild. Standardized UI components leverage native tab implementations (`expo-router/unstable-native-tabs`) and safe area context.
- **Universal File-Based Routing:** Built with **Expo Router v4**, providing file-system routes in `src/app/` (`/` for home, `/explore` for discovery).
- **Web Platform:** Integrated via **react-native-web** and Expo static export (`expo export -p web`), using custom Web UI navigation (`src/components/app-tabs.web.tsx`) and responsive desktop layout breakpoints.
- **Windows Platform:** Employs platform-specific overrides (`Sidebar.windows.tsx`) adhering to Microsoft **WinUI 3 Fluent Design** guidelines, compatible with `react-native-windows`.
- **macOS & Linux Desktop Shells:** Encapsulated in `desktop/` using **Tauri v1 / Rust**, wrapping the static export bundle from React Native Web into lightweight, secure desktop app binaries (`.app`, `.AppImage`, `.deb`, `.exe`).
- **Production Web & SSR Hosting:** Containerized via `Dockerfile` with Express.js (`server.js`) serving static client assets and Expo server adapters.

---

## Directory Tree & Module Map

```
falda-superapp/
├── .claude/                  # Claude AI workspace settings & rules
├── .github/                  # GitHub Actions CI/CD workflows
├── .vscode/                  # Editor workspace settings & recommendations
├── assets/                   # Cross-platform static media assets
│   ├── expo.icon/            # iOS Asset Catalog icon structure
│   └── images/               # High-DPI logos, tab icons, and tutorial graphics
├── desktop/                  # Tauri Rust Desktop Shell project
│   ├── src-tauri/            # Rust source code, build scripts, & Tauri config
│   │   ├── src/main.rs       # Rust main process entrypoint
│   │   ├── Cargo.toml        # Rust dependencies & package configuration
│   │   └── tauri.conf.json   # Tauri window, bundle, & web view configuration
│   └── package.json          # Desktop shell NPM scripts (`desktop:dev`, `desktop:build`)
├── e2e/                      # Playwright End-to-End testing suite
│   └── web-linux.spec.ts     # Web & Linux desktop E2E regression tests
├── src/                      # Universal Application Core
│   ├── api/                  # Universal HTTP client abstractions
│   │   ├── __tests__/        # Unit tests for API layer
│   │   ├── client.ts         # Type-safe fetch wrapper with status handling
│   │   └── index.ts          # API module export barrier
│   ├── app/                  # Expo Router file-based route handlers
│   │   ├── _layout.tsx       # Root navigation layout & theme provider
│   │   ├── explore.tsx       # Explore / Features screen route
│   │   └── index.tsx         # Home screen route
│   ├── components/           # UI Component Library
│   │   ├── __tests__/        # Component unit tests (Jest)
│   │   ├── ui/               # Reusable UI primitives (e.g. Collapsible)
│   │   ├── Button.tsx        # Cross-platform accessible Button component
│   │   ├── Sidebar.tsx       # Desktop & Web sidebar component
│   │   ├── Sidebar.windows.tsx # WinUI 3 Fluent Design sidebar override
│   │   ├── animated-icon.tsx # Native Reanimated splash & logo animation
│   │   ├── animated-icon.web.tsx # Web CSS module fallback animation
│   │   ├── app-tabs.tsx      # Expo Native Tabs layout component
│   │   └── app-tabs.web.tsx  # Expo Router UI Web header & tabs bar
│   ├── constants/            # Global constants & theme definitions
│   │   └── theme.ts          # Color palette, spacing scales, & tab insets
│   ├── hooks/                # Custom React Hooks
│   │   ├── use-color-scheme.ts     # Platform color scheme hook (Native)
│   │   ├── use-color-scheme.web.ts # Web color scheme hook fallback
│   │   └── use-theme.ts            # Active theme accessor hook
│   ├── screens/              # Legacy / Standalone Screen components
│   │   ├── HomeScreen.tsx    # Standard React Native universal screen
│   │   └── index.ts          # Screens export barrier
│   └── global.css            # Web/Tailwind global style declarations
├── AGENTS.md                 # Agent guidelines & Expo SDK directives
├── App.tsx                   # Standalone RN entrypoint (used by RN Windows/macOS)
├── Dockerfile                # Multi-stage production container build definition
├── LICENSE                   # Software license terms
├── README.md                 # Standard project overview & onboarding
├── app.json                  # Expo SDK & application manifest configuration
├── declarations.d.ts         # TypeScript global module declarations (.css)
├── eas.json                  # Expo Application Services build & update config
├── eslint.config.js          # ESLint 9 configuration
├── package.json              # Main project package manifest & dependencies
├── package-lock.json         # Locked dependency graph
├── playwright.config.ts      # E2E web testing runner configuration
├── server.js                 # Express SSR / static web server
└── tsconfig.json             # TypeScript compiler rules & path aliases
```

---

## Target Platform Matrix

| Platform | Rendering Engine / Shell | Route / Entry Point | Platform Overrides |
| :--- | :--- | :--- | :--- |
| **iOS** | Native (UIKit / React Native) | `src/app/_layout.tsx` | Native Bottom Tabs (`app-tabs.tsx`), Reanimated keyframe splash |
| **Android** | Native (Android Views / RN) | `src/app/_layout.tsx` | Predictive back gesture disabled, adaptive icons |
| **Web** | React Native Web + DOM | `src/app/_layout.tsx` | `app-tabs.web.tsx`, `use-color-scheme.web.ts`, CSS module background gradient |
| **Windows** | WinUI 3 / React Native Windows | `App.tsx` / `src/app` | `Sidebar.windows.tsx` (Fluent Design active pill indicator) |
| **macOS** | AppKit / React Native macOS | `App.tsx` / `src/app` | macOS native windowing support |
| **Linux** | Tauri v1 (WebKitGTK / Rust) | `desktop/src-tauri` -> `dist` | Lightweight desktop binary wrapping static web bundle |

---

## Dependency & Config Audit

### Package Summary
- **Core Framework:** `expo` (~52.0.0), `react` (18.3.1), `react-native` (0.76.7), `expo-router` (~4.0.0).
- **Navigation & Native UI:** `react-native-screens`, `react-native-safe-area-context`, `react-native-reanimated` (~3.16.1), `expo-symbols`, `expo-glass-effect`, `expo-image`, `expo-splash-screen`.
- **Desktop & Web Integration:** `react-native-web` (^0.19.13), `@tauri-apps/cli` (^1.5.0 in `desktop/`), `@expo/server`, `express` (^4.21.2), `serve` (^14.2.4).
- **Testing:** `jest` (~29.7.0), `jest-expo`, `@testing-library/react-native`, `@playwright/test` (^1.50.0).

### Redundant / Removed Files
1. **`coverage/` (Removed):** Leftover test coverage report files committed to git. Removed and added to `.gitignore`.
2. **`scripts/reset-project.js` & `scripts/` (Removed):** Default Expo starter boilerplate script for resetting the project to a blank state. Removed as the project is fully structured.

---

## Known Issues, Bugs, and Gaps

### Severity: High
1. **Dual Entrypoint Architecture Split:**
   - `src/app/index.tsx` contains the Expo Router home screen, whereas `App.tsx` imports `HomeScreen` from `src/screens/HomeScreen.tsx`.
   - Running `npx expo start` uses Expo Router (`src/app/index.tsx`), while standalone RN desktop runners targeting `App.tsx` will render `src/screens/HomeScreen.tsx`.
   - **Impact:** Divergent user experiences and code duplication between Expo Router web/mobile targets and RN Windows/macOS runners.

### Severity: Medium
2. **Missing Boundary Error Handler (Expo Router):**
   - No `+not-found.tsx` or global `+error.tsx` boundary file exists in `src/app/`.
   - **Impact:** Unhandled route errors or invalid URLs on Web/Desktop lead to blank white screens instead of a graceful fallback view.
3. **Missing `npm run lint` Script Configuration in Root Package:**
   - Package script `lint` runs `expo lint`, but ESLint 9 configuration uses `eslint.config.js` without a dedicated typecheck script run inside lint.
4. **Desktop Tauri Bundle Path Dependency:**
   - `desktop/src-tauri/tauri.conf.json` expects `../../dist` as `frontendDist`. Running desktop dev before exporting web results in a missing asset build error.

### Severity: Low
5. **Reanimated Gradient Incompatibility Warning on Native:**
   - `animated-icon.tsx` uses `experimental_backgroundImage: 'linear-gradient(...)'` in inline styles, which can throw warnings on native iOS/Android builds if linear gradient native views are required.

---

## Recommended Action Items & Architectural Roadmap

1. **Unify Entrypoint Architecture:**
   - Migrate `src/screens/HomeScreen.tsx` components into Expo Router structure (`src/app/`) or wrap `ExpoRoot` inside `App.tsx` to maintain a single source of truth across mobile, web, and desktop.
2. **Add Error & Not-Found Boundaries:**
   - Create `src/app/+not-found.tsx` and `src/app/+error.tsx` to handle route resolution failures gracefully across all 6 targets.
3. **Automate Desktop Build Pipeline:**
   - Update `desktop:dev` and `desktop:build` npm scripts to automatically check and run `export:web` beforehand.
4. **CI/CD Matrix Expansion:**
   - Update `.github/workflows` to run unit tests (`npm test`), E2E web tests (`npm run test:e2e`), and TypeScript typechecking (`npx tsc --noEmit`) on all PRs.
