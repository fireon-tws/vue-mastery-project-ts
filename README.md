# Plated

Plated is a Vue 3 practice project for managing recipes, menus, and meal planning while working through a structured Vue 3 mastery roadmap.

## Stack

- Vue 3
- TypeScript
- Composition API
- Vue Router
- Pinia
- Tailwind CSS v4
- Vite

## Current Status

The project has the initial application shell in place:

- App shell with sidebar navigation
- Route-based page structure
- Core views for home, menus, planner, favorites, shopping list, settings, and 404
- Tailwind-based layout and theme tokens
- Vercel SPA rewrite config

The app is still in the early scaffold phase. Most feature work in state management, forms, and data flow is planned but not implemented yet.

## Routes

- `/`
- `/menus`
- `/menus/new`
- `/menus/:id`
- `/menus/:id/edit`
- `/planner`
- `/shopping-list`
- `/favorites`
- `/settings`
- `404`

## Getting Started

### Install dependencies

```sh
npm install
```

### Start the dev server

```sh
npm run dev
```

### Type-check and build

```sh
npm run build
```

### Lint the project

```sh
npm run lint
```

### Preview the production build

```sh
npm run preview
```

## Project Structure

```text
src/
  assets/
    main.css
  components/
    layout/
      AppShell.vue
  router/
    index.ts
  stores/
    counter.ts
  views/
    HomeView.vue
    MenuListView.vue
    MenuCreateView.vue
    MenuDetailView.vue
    MenuEditView.vue
    PlannerView.vue
    ShoppingListView.vue
    FavoritesView.vue
    SettingsView.vue
    NotFoundView.vue
  App.vue
  main.ts
```

## Notes

- The learning checklist lives in [docs/vue-mastery-checklist.md](docs/vue-mastery-checklist.md).
- The product direction and scope live in [docs/project-plan.md](docs/project-plan.md).
- A Vercel config is present in `vercel.json`. Live deployment: **https://plated-five.vercel.app/**
