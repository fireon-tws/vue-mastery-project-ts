<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import RecipeCard from '@/components/recipes/RecipeCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useRecipeStore } from '@/stores/recipe'

const recipeStore = useRecipeStore()
const { recipeCount, recipes } = storeToRefs(recipeStore)
</script>

<template>
  <section class="space-y-6">
    <PageHeader
      :title="'Recipes'"
      :subtitle="`${recipeCount} saved recipes are now managed centrally with Pinia.`"
    >
      <template #actions>
        <BaseButton to="/menus/new">Add recipe</BaseButton>
      </template>
    </PageHeader>

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
