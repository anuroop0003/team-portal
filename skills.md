# 📐 Project Structure Blueprint & Module Management Guide (`skills.md`)

This document serves as the **official codebase blueprint** and **architectural helper**. It defines standard folder layouts, naming conventions, file placement rules, and step-by-step developer guidelines for adding and maintaining modules across the **Team Portal** application using the **Bulletproof React** architecture.

---

## 🚀 1. The Standard Feature Blueprint

To keep the application modular, scalable, and self-contained, **every feature module** created in `src/features/` must adhere to this exact structural hierarchy:

```text
src/features/[feature-name]/
├── index.ts                           # 1. Feature Public API (Exports entry points, hooks, types)
│
├── api/                               # 2. API queries, mutations (React Query), and types
│   ├── [query-name].query.ts
│   └── [query-name].types.ts
│
├── validations/                       # 3. Zod validation schemas for forms
│   └── [feature].schema.ts
│
├── types/                             # 4. TypeScript interfaces specific to this feature
│   └── [feature].types.ts
│
├── stores/                            # 5. Local state management containers (Zustand)
│   └── use-[feature]-store.ts
│
└── components/                        # 6. Feature UI Components & Sub-pages
    ├── page.tsx                       # Main entrypoint view
    ├── constants.ts                   # Feature-specific constants & mock data
    ├── [feature]-header.tsx           # Standard page header
    ├── [feature]-stats.tsx            # Stats widgets
    ├── [feature]-table.tsx            # Data list grid
    │
    └── [complex-feature]/             # Encapsulated Complex Sub-features
        ├── [feature]-modal.tsx        # Modal/dialog wrapper component
        └── [feature]-form.tsx         # Form container using validations
```

### 📋 Blueprint Component Rules:
1. **Feature Encapsulation**: A feature's internal folders (`api`, `validations`, `types`, `stores`) are private. Other features must only import from the feature's barrel file (`src/features/[feature-name]/index.ts`).
2. **`components/page.tsx`**: Responsible only for layout structure, page-level state management, and high-level React Query integration. It should be kept clean of heavy inline JSX blocks or inline forms.
3. **Shared Components**: Shared, generic UI components (e.g. Buttons, Inputs) live in `src/components/ui/`. If a domain component is shared between multiple features, it should move to the global shared components folder (`src/components/`).

---

## 📁 2. Global Repository Directory Map

All supporting infrastructure lives outside the `features/` directory:

```text
src/
├── assets/                            # Static media, icons, and logo assets
├── components/                        # Shared Application Infrastructure
│   ├── app-layout/                    # Global app wrapper layout containing routing frame
│   ├── sidebar/                       # Universal side navigation components
│   └── ui/                            # Atomic, reusable design system primitives (Shadcn/Radix UI)
│
├── config/                            # Global configuration values and environment variables
├── hooks/                             # Global, reusable custom React Hooks
├── layouts/                           # Global routing layouts and shells (e.g. AuthLayout)
├── lib/                               # Third-party instances (e.g. queryClient, utility classes)
├── routes/                            # React Router configurations, guard clauses, paths
│
├── features/                          # Self-contained feature modules (Bulletproof React core)
│
├── store/                             # Global state management containers (Zustand)
├── types/                             # Global TypeScript definition files (`.ts` or `.d.ts`)
│
└── global.css                         # Shared CSS variables, dark mode styling, and fonts
```

---

## 🏷️ 3. Naming & Case Conventions

To ensure consistent project scanning and search matches, follow these casing rules strictly:

| Target Asset | Casing | Example |
| :--- | :--- | :--- |
| **Directory Names** | `kebab-case` | `user-management`, `assign-spot` |
| **Component Files (`.tsx`)** | `kebab-case` | `user-table.tsx`, `add-member-modal.tsx` |
| **Non-Component Files (`.ts`)** | `kebab-case` | `auth.query.ts`, `member.schema.ts` |
| **TypeScript Types & Classes** | `PascalCase` | `interface UserProfile {}`, `type ShiftType` |
| **React Component Names** | `PascalCase` | `export const UserTable = () => { ... }` |
| **Zod Schemas** | `camelCase` | `export const memberSchema = z.object({ ... })` |

---

## 🛠️ 4. Action Checklist: Adding a New Feature/Module

Follow this checklist whenever adding a new feature to maintain the codebase standard:

- [ ] **Step 1: Create Feature Directory**
  - Scaffold directories under `src/features/[feature-name]/` (`components`, `api`, `validations`, `types`, `stores`).
- [ ] **Step 2: Constants, Types, & Validations**
  - Define local types in `src/features/[feature-name]/types/`.
  - Define Zod forms schemas in `src/features/[feature-name]/validations/`.
  - Create constants and mock data in `src/features/[feature-name]/components/constants.ts`.
- [ ] **Step 3: Services & API Layer**
  - Implement query hooks inside `src/features/[feature-name]/api/[feature-name].query.ts`.
  - Define matching requests/responses in `src/features/[feature-name]/api/[feature-name].types.ts`.
- [ ] **Step 4: View Components**
  - Implement layout and containers in `src/features/[feature-name]/components/page.tsx` and nested components.
- [ ] **Step 5: Define routes and exports**
  - Create `src/features/[feature-name]/routes.tsx` and define the sub-routes lazy importing page components directly.
  - Create `src/features/[feature-name]/index.ts` (barrel file) and export public configurations, query hooks, types, schemas, and routes (avoid exporting lazy-loaded page components statically to keep chunks optimal).
- [ ] **Step 6: Register Route in sections.tsx**
  - Register the new paths inside `src/routes/constants/paths.ts`.
  - Import the feature routes into `src/routes/constants/sections.tsx` and spread them under the public/private routes array.

---

## 📊 5. Conforming Live Features Reference

Here is how current features strictly map to these structural guidelines:

### 🚗 Parking Feature Example
```text
src/features/parking/
├── index.ts                          # Public API exporting parking routes, types, validations, and utils
├── routes.tsx                        # Feature routing config defining sub-routes & lazy imports
├── types/
│   └── parking.ts                    # Parking slot TypeScript types
├── validations/
│   └── parking.schema.ts             # Parking Zod schemas
├── utils/
│   └── parking.ts                    # Parking-specific helpers (e.g. variants, icon getters)
└── components/
    ├── page.tsx                      # Primary dashboard grid orchestrating widgets
    ├── constants.ts                  # Parking slot layouts and capacities constants
    ├── parking-card.tsx              # Component: displays spot profile
    ├── parking-grid.tsx              # Component: spot list layout wrapper
    ├── parking-header.tsx            # Component: controls search, trigger, view selection
    ├── parking-stats.tsx             # Component: quick stats calculations
    ├── parking-table.tsx             # Component: data grid list
    │
    ├── assign-spot/                  # Sub-feature module
    │   ├── assign-form.tsx           # Sub-feature component: spot assignment form
    │   └── assign-modal.tsx          # Sub-feature component: modal container
    │
    └── manage-spots/                 # Sub-feature module
        ├── delete-spot-dialog.tsx    # Sub-feature component: spot deletion confirmation
        ├── manage-table.tsx          # Sub-feature component: spots CRUD list
        └── spot-modal.tsx            # Sub-feature component: spot editor modal
```

### 👥 Workforce Feature Example
```text
src/features/workforce/
├── index.ts                          # Public API exporting workforce routes, types, validations, and queries
├── routes.tsx                        # Feature routing config defining sub-routes & lazy imports
├── types/
│   └── workforce.ts                  # Workforce member TypeScript types
├── validations/
│   └── member.schema.ts              # Member invite Zod validation schemas
├── utils/
│   └── workforce.ts                  # Workforce-specific helper/formatting logic
├── api/
│   ├── user-management.query.ts      # React Query hooks for user/member endpoints
│   └── user-management.types.ts      # Workforce backend API types
└── components/
    ├── constants.ts                  # Roles, departments constants
    ├── directory/                    # Sub-page directory component module
    │   ├── page.tsx                  # Base directory search container
    │   └── components/
    │       ├── directory-header.tsx  # Page header component
    │       ├── directory-search.tsx  # Keyword search field component
    │       ├── directory-stats.tsx   # Department stats counts
    │       ├── member-card.tsx       # Member profile block card
    │       └── member-grid.tsx       # Profile cards listing layout
    │
    └── user-management/              # Sub-page admin settings module
        ├── page.tsx                  # Main administration table shell
        └── components/
            ├── management-header.tsx # Header controls
            ├── user-table.tsx        # Responsive actions list grid
            ├── invite-member/        # Sub-feature module
            │   ├── add-member-modal.tsx # Popup modal wrapper
            │   ├── invite-form.tsx   # Form fields and trigger validation
            │   └── invite-success.tsx # Onboarding confirmation template
            │
            └── edit-member/          # Sub-feature module
                ├── delete-member-dialog.tsx # Member deletion confirmation
                ├── edit-member-form.tsx # Interactive profile edit fields
                └── edit-member-modal.tsx # Wrapper modal dialog
```
