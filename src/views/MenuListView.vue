<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import RecipeCard from '../components/recipes/RecipeCard.vue'
import { useRecipeStore } from '../stores/recipe'

const recipeStore = useRecipeStore()
const { recipeCount, recipes } = storeToRefs(recipeStore)
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div class="space-y-2">
        <h1 class="page-heading">Recipes</h1>
        <p class="text-base text-secondary">
          {{ recipeCount }} saved recipes are now managed centrally with Pinia.
        </p>
      </div>

      <RouterLink
        to="/menus/new"
        class="inline-flex items-center justify-center rounded-pill bg-brand-primary px-4 py-2 text-sm font-medium text-on-accent"
      >
        Add recipe
      </RouterLink>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="space-y-3 transition-transform hover:-translate-y-0.5"
      >
        <RecipeCard :recipe="recipe" @toggle-favorite="recipeStore.toggleFavorite" />
        <RouterLink :to="`/menus/${recipe.id}`" class="inline-flex text-sm text-brand-primary">
          View details
        </RouterLink>
      </div>
    </div>
  </section>
</template>
