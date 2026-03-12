<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import RecipeCard from '../components/recipes/RecipeCard.vue'
import { useRecipeStore } from '../stores/recipe'

const recipeStore = useRecipeStore()
const { favoriteRecipes, recentRecipes } = storeToRefs(recipeStore)

const actionCards = [
  {
    title: 'Add New Recipe',
    description: 'Save your favorite dishes',
    tone: 'bg-brand-primary text-on-accent',
    icon: '+',
    to: '/menus/new',
  },
  {
    title: 'Meal Planner',
    description: 'Plan your weekly meals',
    tone: 'bg-brand-secondary text-primary',
    icon: '↗',
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
    <section class="space-y-2">
      <h1 class="display-heading max-w-[10ch]">Good afternoon!</h1>
      <p class="text-base text-secondary">What would you like to cook today?</p>
    </section>

    <section class="grid gap-4 lg:grid-cols-2">
      <RouterLink
        v-for="card in actionCards"
        :key="card.title"
        :to="card.to"
        class="flex items-center justify-between rounded-card px-6 py-5 transition-transform hover:-translate-y-0.5"
        :class="card.tone"
      >
        <div class="space-y-1">
          <h2 class="text-xl font-medium tracking-[-0.02em]">{{ card.title }}</h2>
          <p
            class="text-sm"
            :class="card.title === 'Add New Recipe' ? 'text-on-accent/80' : 'text-primary/70'"
          >
            {{ card.description }}
          </p>
        </div>
        <span class="text-3xl leading-none">{{ card.icon }}</span>
      </RouterLink>
    </section>

    <section v-for="section in recipeSections" :key="section.title" class="space-y-6">
      <div class="flex items-center justify-between gap-4">
        <h2 class="section-heading">
          {{ section.title }}
        </h2>
        <RouterLink :to="section.to" class="text-sm text-brand-primary hover:opacity-80">
          {{ section.action }}
        </RouterLink>
      </div>

      <div v-if="section.recipes.length" class="grid gap-4 xl:grid-cols-3">
        <RecipeCard
          v-for="recipe in section.recipes"
          :key="`${section.title}-${recipe.id}`"
          :recipe="recipe"
          @toggle-favorite="recipeStore.toggleFavorite"
        />
      </div>

      <div
        v-else
        class="rounded-panel border border-dashed border-subtle bg-surface-panel px-6 py-8 text-sm text-secondary"
      >
        No recipes in this section yet.
      </div>
    </section>
  </div>
</template>
