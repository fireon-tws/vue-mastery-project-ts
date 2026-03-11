# 🍽️ Plated

A personal platform to store and manage home-cooked dishes.

This project is built with:

- Vue 3
- TypeScript
- Composition API
- Pinia
- TailwindCSS
- VeeValidate
- Vue Router

The project is designed to follow a **Vue 3 Mastery learning plan (15 weeks)**.

---

# 🎯 Project Goal

Create a web application that allows users to:

- store home recipes
- organize menus
- search and filter dishes
- track ingredients
- plan meals
- generate shopping lists

This project serves both as:

1. A **real daily-use application**
2. A **complete Vue 3 mastery practice project**

---

# 🧩 Core Features

## 1. Menu Library

Store dishes such as:

- fried rice
- aglio olio
- chicken chop
- sandwiches
- coffee drinks
- desserts

Each menu contains:

- name
- category
- cuisine
- difficulty
- prep time
- cook time
- servings
- ingredients
- steps
- tags
- image
- notes
- favorite flag

---

## 2. Search and Filter

Users can search recipes by:

- dish name
- ingredient
- category
- cuisine
- difficulty
- cooking time

Example queries:

- "breakfast recipes"
- "recipes with egg"
- "quick meals under 20 minutes"

---

## 3. Recipe Detail Page

Each recipe page displays:

- dish image
- summary
- ingredients list
- cooking steps
- cooking time
- portion size
- notes

---

## 4. Add / Edit Recipe

Recipe form includes:

- name
- category
- cooking time
- ingredients
- steps
- tags
- notes

Features:

- dynamic ingredient list
- dynamic cooking steps
- validation

---

## 5. Favorites

Users can mark recipes as favorites.

Example use:

- frequently cooked dishes
- family favorites
- quick meals

---

## 6. Weekly Meal Planner

Users can plan meals for:

- breakfast
- lunch
- dinner

Example:

Monday
- lunch: fried rice
- dinner: aglio olio

---

## 7. Shopping List Generator

The app can generate a combined shopping list from selected recipes.

Example output:

- eggs × 6
- garlic × 2 bulbs
- milk × 1 liter
- butter × 100g

---

# 🧱 Example Data Models

```ts
export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: string
}

export interface RecipeStep {
  id: string
  order: number
  instruction: string
}

export interface MenuRecipe {
  id: string
  name: string
  category: "breakfast" | "lunch" | "dinner" | "dessert" | "drink"
  cuisine?: string
  difficulty: "easy" | "medium" | "hard"
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Ingredient[]
  steps: RecipeStep[]
  tags: string[]
  image?: string
  notes?: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}