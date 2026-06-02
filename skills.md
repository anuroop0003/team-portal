# 📐 Project Structure Blueprint & Module Management Guide (`skills.md`)

This document serves as the **official codebase blueprint** and **architectural helper**. It defines standard folder layouts, naming conventions, file placement rules, and step-by-step developer guidelines for adding and maintaining modules across the **Team Portal** application.

---

## 🚀 1. The Standard Module Blueprint

To keep the application modular and predictable, **every new page or feature module** created in `src/pages/` must adhere to this exact structural hierarchy:

```text
src/pages/[module-name]/
├── page.tsx                           # 1. Main Entrypoint & Page Shell
├── constants.ts                       # 2. Module-specific constants & mock data
├── [optional-sub-page]/               # 3. Sub-pages (nested routes) if applicable
│   ├── page.tsx
│   └── components/
└── components/                        # 4. Local Module UI Components
    ├── [module-name]-header.tsx       # Standard module page header
    ├── [module-name]-stats.tsx        # Standard stats banner (if applicable)
    ├── [module-name]-table.tsx        # Table view for datasets (if applicable)
    │
    └── [complex-feature]/             # 5. Encapsulated Complex Sub-features
        ├── [feature]-modal.tsx        # Modal/dialog wrapper component
        └── [feature]-form.tsx         # Dedicated form container (with Zod validation)
```

### 📋 Blueprint Component Rules:
1. **`page.tsx`**: Responsible only for layout structure, page-level state management, and high-level React Query integration. It should be kept clean of heavy inline JSX blocks or inline forms.
2. **`components/`**: Private components used *only* by this module. If a component is shared between two or more top-level modules, relocate it to the global directory (`src/components/`).
3. **Complex Feature Directories**: When a local component requires a dialog and a form, group them inside a nested folder (e.g., `components/assign-spot/` containing `assign-modal.tsx` and `assign-form.tsx`).

---

## 📁 2. Global Repository Directory Map

All support layers (types, styling, queries, validations, state) must be structured outside of the view pages to support separation of concerns:

```text
src/
├── assets/                            # Static media, icons, and logo assets
├── components/                        # Shared Application Infrastructure
│   ├── app-layout/                    # Global app wrapper layout containing routing frame
│   ├── sidebar/                       # Universal side navigation components
│   └── ui/                            # Atomic, reusable design system primitives (Shadcn/Radix UI)
│
├── constants/                         # Global constant values (e.g. system configurations, permissions)
├── hooks/                             # Global, reusable custom React Hooks
├── layouts/                           # Global module-level routing shells and layouts
├── lib/                               # Third-party instance configs (e.g. utility classes, custom clients)
├── routes/                            # React Router configurations, guard clauses, paths
│
├── services/                          # API Connection Layer (Queries & Mutations)
│   └── query/                         # Subdivided by API scope
│       ├── [module]/                  # Query and API type hooks (React Query)
│       └── api.types.ts               # Universal API schemas
│
├── store/                             # Global state management containers (Zustand)
├── types/                             # Global TypeScript definition files (`.ts` or `.d.ts`)
├── validations/                       # Zod validation schemas for forms across the app
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

## 🛠️ 4. Action Checklist: Adding a New Page/Module

Follow this checklist whenever adding a new feature page to maintain the codebase standard:

- [ ] **Step 1: Constants & Types**
  - Create types in `src/types/[module].ts`.
  - Place default configurations or Mock Datasets in `src/pages/[module]/constants.ts`.
- [ ] **Step 2: Validation Schema**
  - Define Zod forms schemas in `src/validations/[module].schema.ts`.
- [ ] **Step 3: Services & API Layer**
  - Implement query hooks inside `src/services/query/[module]/[module].query.ts`.
  - Define matching requests/responses in `src/services/query/[module]/[module].types.ts`.
- [ ] **Step 4: Layout and Router**
  - Register the new paths inside `src/routes/constants/paths.ts` and elements in `src/routes/constants/elements.tsx`.
- [ ] **Step 5: View Components**
  - Scaffold the layout in `src/pages/[module]/page.tsx`.
  - Implement page widgets inside `src/pages/[module]/components/` adhering to the naming conventions.

---

## 📊 5. Conforming Live Modules Reference

Here is how current modules strictly map to these structural guidelines:

### 🚗 Parking Module Example
```text
src/pages/parking/
├── constants.ts                      # Parking slot layouts and capacities constants
├── page.tsx                          # Primary dashboard grid orchestrating widgets
└── components/
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

### 👥 Workforce Module Example
```text
src/pages/workforce/
├── constants.ts                      # Roles, departments constants
└── pages/
    ├── directory/                    # Sub-page directory module
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
            │
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
