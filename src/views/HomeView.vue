<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import RecipeCard from '@/components/recipes/RecipeCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useRecipeStore } from '@/stores/recipe'

const recipeStore = useRecipeStore()
const { favoriteRecipes, recentRecipes } = storeToRefs(recipeStore)

const greeting = computed(() => {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Good morning'
  }

  if (hour < 18) {
    return 'Good afternoon'
  }

  return 'Good evening'
})

const actionCards = [
  {
    title: 'Add New Recipe',
    description: 'Save your favorite dishes',
    actionLabel: 'Create recipe',
    to: '/menus/new',
  },
  {
    title: 'Meal Planner',
    description: 'Plan your weekly meals',
    actionLabel: 'Open planner',
    to: '/planner',
  },
]

const recipeSections = computed(() => [
  {
    title: 'Recently Cooked',
    action: 'View all recipes',
    to: '/menus',
    recipes: recentRecipes.value,
  },
  {
    title: 'Your Favorites',
    action: 'View all favorites',
    to: '/favorites',
    recipes: favoriteRecipes.value,
  },
])
</script>

<template>
  <div class="space-y-12">
    <PageHeader
      :title="`${greeting}!`"
      subtitle="Pick a comforting dish and make today delicious."
    />

    <section class="grid gap-4 lg:grid-cols-2">
      <article
        v-for="card in actionCards"
        :key="card.title"
        class="rounded-2xl bg-warm p-6 shadow-sm ring-1 ring-primary/10"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-xl font-medium tracking-[-0.02em] text-primary">{{ card.title }}</h2>
            <p class="text-sm text-secondary">
              {{ card.description }}
            </p>
          </div>

          <BaseButton :to="card.to" size="sm">{{ card.actionLabel }}</BaseButton>
        </div>
      </article>
    </section>

    <section v-for="section in recipeSections" :key="section.title" class="space-y-6">
      <div class="flex items-center justify-between gap-4">
        <h2 class="section-heading">
          {{ section.title }}
        </h2>
        <BaseButton variant="ghost" size="sm" :to="section.to">{{ section.action }}</BaseButton>
      </div>

      <div v-if="section.recipes.length" class="grid gap-4 xl:grid-cols-3">
        <RecipeCard
          v-for="recipe in section.recipes"
          :key="`${section.title}-${recipe.id}`"
          :recipe="recipe"
          @toggle-favorite="recipeStore.toggleFavorite"
        />
      </div>

      <EmptyState
        v-else
        icon="🍲"
        title="Nothing here yet"
        description="No recipes in this section yet. Add one to start your collection."
      />
    </section>
  </div>
</template>
