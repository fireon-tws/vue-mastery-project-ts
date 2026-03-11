
# 🚀 Vue 3 Mastery Checklist

This checklist tracks the implementation progress of the **Vue 3 Mastery Program** while building the **Home Menu Keeper** project.

Tech stack:

- Vue 3
- TypeScript
- Composition API
- Vue Router
- Pinia
- TailwindCSS
- VeeValidate

---

# 📅 Program Timeline

| Checkpoint | Weeks | Focus |
|---|---|---|
| 1 | 1–2 | Bootstrap + Deploy |
| 2 | 3–4 | State Management (Pinia) |
| 3 | 5–6 | Template Core Loop |
| 4 | 7–8 | Components In Depth |
| 5 | 9–10 | Forms + Validation |
| 6 | 11 | API Calls + Lifecycle + Watchers |
| 7 | 12–13 | Advanced Components |
| 8 | 14 | Rendering + Performance |
| 9 | 15 | Transitions + Accessibility + Security |

---

# ✅ Checkpoint 1 — Bootstrap + Deploy

## Project Setup

- [ ] Create project using `create-vue`
- [ ] Enable **TypeScript**
- [ ] Setup **Composition API**
- [ ] Setup project folder structure

## Router

- [ ] Install Vue Router
- [ ] Configure router

Routes implemented:

- [ ] `/`
- [ ] `/menus`
- [ ] `/menus/new`
- [ ] `/menus/:id`
- [ ] `/menus/:id/edit`
- [ ] `/planner`
- [ ] `404`

## Layout

- [ ] Create `AppShell`
- [ ] Create navigation bar
- [ ] Active link styles

## TailwindCSS

- [ ] Install Tailwind
- [ ] Use Tailwind in ≥10 UI elements
- [ ] Define container layout pattern

## Deployment

- [ ] Setup Vercel CLI
- [ ] First deployment completed
- [ ] Live URL verified

---

# ✅ Checkpoint 2 — State Management (Pinia)

## Setup

- [ ] Install Pinia
- [ ] Register Pinia in `main.ts`

## Stores

### Theme Store

- [ ] Light mode
- [ ] Dark mode
- [ ] Toggle action

### Recipe Store

- [ ] Store recipes
- [ ] Add recipe
- [ ] Edit recipe
- [ ] Delete recipe
- [ ] Toggle favorite

### Planner Store

- [ ] Weekly planner state
- [ ] Assign recipe to day
- [ ] Remove planned meal

### App UI Store

- [ ] Modal state
- [ ] Toast notifications

## Store Requirements

Each store contains:

- [ ] state
- [ ] getter
- [ ] action

---

# ✅ Checkpoint 3 — Template Core Loop

## Recipe List Page

- [ ] Render recipes with `v-for`
- [ ] Use proper keys

## Data Rendering

- [ ] ≥10 template interpolations
- [ ] Dynamic fields rendered from data

Examples:

- recipe name
- cook time
- difficulty
- servings
- category

## Directives

Used directives:

- [ ] `v-bind`
- [ ] `v-on`
- [ ] `v-if`
- [ ] `v-else`
- [ ] `v-for`

Optional directives:

- [ ] `v-text`
- [ ] `v-cloak`
- [ ] `v-once`

## UI States

- [ ] Loading state
- [ ] Empty state
- [ ] Error state

## Interactions

- [ ] Search recipes
- [ ] Filter by category
- [ ] Sort recipes

Keyboard shortcuts:

- [ ] `/` focuses search
- [ ] `Esc` clears search

---

# ✅ Checkpoint 4 — Components In Depth

## Reusable Components

Create reusable components:

- [ ] `RecipeCard`
- [ ] `IngredientList`
- [ ] `StepList`
- [ ] `BaseButton`
- [ ] `BaseInput`
- [ ] `PageSection`

## Component Communication

Props:

- [ ] Components accept props
- [ ] Props validation

Events:

- [ ] Child emits events
- [ ] Parent reacts to events

Example:

```
@add-recipe
@remove-recipe
```

## Slots

- [ ] Default slot
- [ ] Named slot

Example:

```
<PageSection>
  <template #header>
    Recipes
  </template>
</PageSection>
```

## Attribute Fallthrough

- [ ] Pass `class`
- [ ] Pass `data-testid`

---

# ✅ Checkpoint 5 — Forms + Validation

## Recipe Form

Create full recipe form:

Fields:

- [ ] recipe name
- [ ] category
- [ ] difficulty
- [ ] prep time
- [ ] cook time
- [ ] ingredients
- [ ] steps
- [ ] notes

## Dynamic Fields

- [ ] Add ingredient rows
- [ ] Remove ingredient rows
- [ ] Add cooking steps
- [ ] Reorder steps

## v-model

- [ ] Use v-model on ≥4 inputs

Modifiers:

- [ ] `.trim`
- [ ] `.number`
- [ ] `.lazy`

## Reusable Input Components

- [ ] BaseInput
- [ ] BaseTextarea
- [ ] BaseSelect

## Validation (VeeValidate)

- [ ] Required fields
- [ ] Inline error messages
- [ ] Submit blocked when invalid
- [ ] Custom validation rule

Example:

```
Recipe name min length 3
```

---

# ✅ Checkpoint 6 — API + Lifecycle + Watchers

## API Integration

- [ ] Replace mock data with API
- [ ] Implement fetch for recipes

Optional APIs:

- Unsplash (food images)
- TheMealDB

## Lifecycle Hooks

- [ ] Use `onMounted()` for fetching data
- [ ] Document reason for lifecycle usage

## Watchers

- [ ] Watch route params
- [ ] Watch search input
- [ ] Refetch data when filters change

Example:

```
watch(() => route.params.id, fetchRecipe)
```

---

# ✅ Checkpoint 7 — Advanced Vue Features

## Teleport

- [ ] Modal rendered using Teleport
- [ ] Close modal on overlay click
- [ ] Close modal with `Esc`

## Async Components

- [ ] Lazy load heavy component

Example:

- Recipe detail sidebar

## Provide / Inject

Use for:

- [ ] configuration
- [ ] measurement units
- [ ] app settings

## Custom Directive

Create one directive:

- [ ] `v-autofocus`

or

- [ ] `v-click-outside`

## Plugin

Create plugin:

- [ ] Toast notification plugin

Example:

```
$toast("Recipe saved")
```

---

# ✅ Checkpoint 8 — Rendering + Performance

## Performance Issues

Identify at least two issues.

Examples:

- large recipe list
- unnecessary rerenders

## Optimization

- [ ] Computed properties used
- [ ] Avoid unnecessary watchers
- [ ] Optimize list rendering

## KeepAlive

- [ ] Cache expensive views

Example:

```
<KeepAlive include="RecipeList">
```

---

# ✅ Checkpoint 9 — Transitions + Accessibility + Security

## Transitions

- [ ] Page transition
- [ ] List animation

Example:

```
<Transition>
<TransitionGroup>
```

## Styling System

- [ ] Standardize Tailwind patterns
- [ ] Create `docs/styling.md`

Define:

- spacing
- typography
- buttons

## Accessibility

- [ ] Visible focus states
- [ ] Keyboard navigation
- [ ] ARIA labels

## Security

- [ ] Avoid unsafe `v-html`
- [ ] Document sanitization strategy
- [ ] Add `docs/security.md`

---

# 🏁 Completion Goal

When all checklist items are completed, the project will demonstrate:

- full Vue 3 component architecture
- state management with Pinia
- advanced Vue features
- form handling
- API integration
- performance optimization
- accessibility best practices

This project can serve as a **production-level Vue portfolio project**.
