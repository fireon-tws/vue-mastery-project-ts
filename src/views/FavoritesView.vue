<script setup lang="ts">
import { storeToRefs } from 'pinia'

import RecipeCard from '@/components/recipes/RecipeCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useRecipeStore } from '@/stores/recipe'

const recipeStore = useRecipeStore()
const { favoriteRecipes } = storeToRefs(recipeStore)
</script>

<template>
  <section class="space-y-6">
    <PageHeader title="Favorites" subtitle="Your pinned recipes stay one tap away." />

    <div v-if="favoriteRecipes.length" class="grid gap-4 xl:grid-cols-3">
      <RecipeCard
        v-for="recipe in favoriteRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @toggle-favorite="recipeStore.toggleFavorite"
      />
    </div>

    <EmptyState
      v-else
      icon="❤️"
      title="No favorites yet"
      description="Mark a recipe with the heart icon and it will appear here."
    >
      <template #action>
        <BaseButton variant="secondary" to="/menus">Browse recipes</BaseButton>
      </template>
    </EmptyState>
  </section>
</template>
