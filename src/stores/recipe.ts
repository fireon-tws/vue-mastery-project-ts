import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { seedRecipes } from '../data/recipes'
import type { MenuRecipe } from '../types/app'

type RecipeInput = Omit<MenuRecipe, 'id' | 'createdAt' | 'updatedAt'>
type RecipeUpdate = Partial<Omit<MenuRecipe, 'id' | 'createdAt' | 'updatedAt'>> & { id: string }

function buildTimestamp() {
  return new Date().toISOString()
}

function slugifyRecipeName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<MenuRecipe[]>(seedRecipes)

  const recipeCount = computed(() => recipes.value.length)
  const favoriteRecipes = computed(() => recipes.value.filter((recipe) => recipe.isFavorite))
  const recentRecipes = computed(() => [...recipes.value].slice(0, 3))

  function getRecipeById(id: string) {
    return recipes.value.find((recipe) => recipe.id === id) ?? null
  }

  function addRecipe(recipe: RecipeInput) {
    const timestamp = buildTimestamp()
    const nextRecipe: MenuRecipe = {
      ...recipe,
      id: slugifyRecipeName(recipe.name),
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    recipes.value = [nextRecipe, ...recipes.value]
    return nextRecipe
  }

  function editRecipe(update: RecipeUpdate) {
    recipes.value = recipes.value.map((recipe) =>
      recipe.id === update.id
        ? {
            ...recipe,
            ...update,
            updatedAt: buildTimestamp(),
          }
        : recipe,
    )
  }

  function deleteRecipe(id: string) {
    recipes.value = recipes.value.filter((recipe) => recipe.id !== id)
  }

  function toggleFavorite(id: string) {
    const recipe = getRecipeById(id)
    if (!recipe) {
      return
    }

    recipe.isFavorite = !recipe.isFavorite
    recipe.updatedAt = buildTimestamp()
  }

  return {
    recipes,
    recipeCount,
    favoriteRecipes,
    recentRecipes,
    getRecipeById,
    addRecipe,
    editRecipe,
    deleteRecipe,
    toggleFavorite,
  }
})
