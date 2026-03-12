<script setup lang="ts">
import { storeToRefs } from 'pinia'

import RecipeCard from '../components/recipes/RecipeCard.vue'
import { useRecipeStore } from '../stores/recipe'

const recipeStore = useRecipeStore()
const { favoriteRecipes } = storeToRefs(recipeStore)
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h1 class="page-heading">Favorites</h1>
      <p class="text-base text-secondary">Your pinned recipes stay one tap away here.</p>
    </div>

    <div v-if="favoriteRecipes.length" class="grid gap-4 xl:grid-cols-3">
      <RecipeCard
        v-for="recipe in favoriteRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @toggle-favorite="recipeStore.toggleFavorite"
      />
    </div>

    <div
      v-else
      class="rounded-panel border border-dashed border-subtle bg-surface-panel px-6 py-10 text-sm text-secondary"
    >
      Mark a recipe with the heart icon and it will appear here.
    </div>
  </section>
</template>
