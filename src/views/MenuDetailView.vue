<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useRecipeStore } from '../stores/recipe'

const route = useRoute()
const recipeStore = useRecipeStore()

const recipe = computed(() => recipeStore.getRecipeById(String(route.params.id)))

const totalTime = computed(() => {
  if (!recipe.value) {
    return 0
  }

  return recipe.value.prepTime + recipe.value.cookTime
})
</script>

<template>
  <section v-if="recipe" class="space-y-8">
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <div class="overflow-hidden rounded-panel border border-subtle bg-surface-panel shadow-card">
        <img :src="recipe.image" :alt="recipe.name" class="aspect-[4/3] h-full w-full object-cover" />
      </div>

      <div class="space-y-5 rounded-panel border border-subtle bg-surface-panel p-6 shadow-card">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-[0.18em] text-secondary">{{ recipe.category }}</p>
          <h1 class="page-heading">{{ recipe.name }}</h1>
          <p class="text-base text-secondary">
            {{ recipe.cuisine }} · {{ recipe.difficulty }} · {{ recipe.servings }} servings
          </p>
        </div>

        <div class="grid gap-3 text-sm text-secondary sm:grid-cols-3">
          <div class="rounded-card bg-brand-warm px-4 py-3">
            <p class="text-[11px] uppercase tracking-[0.16em]">Prep</p>
            <p class="mt-1 text-base text-primary">{{ recipe.prepTime }} min</p>
          </div>
          <div class="rounded-card bg-brand-warm px-4 py-3">
            <p class="text-[11px] uppercase tracking-[0.16em]">Cook</p>
            <p class="mt-1 text-base text-primary">{{ recipe.cookTime }} min</p>
          </div>
          <div class="rounded-card bg-brand-warm px-4 py-3">
            <p class="text-[11px] uppercase tracking-[0.16em]">Total</p>
            <p class="mt-1 text-base text-primary">{{ totalTime }} min</p>
          </div>
        </div>

        <p class="text-sm leading-6 text-secondary">
          {{ recipe.notes || 'No additional notes saved for this recipe yet.' }}
        </p>

        <button
          type="button"
          class="inline-flex items-center rounded-pill border border-subtle px-4 py-2 text-sm font-medium text-primary"
          @click="recipeStore.toggleFavorite(recipe.id)"
        >
          {{ recipe.isFavorite ? 'Remove from favorites' : 'Save to favorites' }}
        </button>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="rounded-panel border border-subtle bg-surface-panel p-6 shadow-card">
        <h2 class="section-heading">Ingredients</h2>
        <ul class="mt-5 space-y-3 text-sm text-secondary">
          <li
            v-for="ingredient in recipe.ingredients"
            :key="ingredient.id"
            class="flex items-center justify-between gap-4 border-b border-subtle pb-3 last:border-b-0 last:pb-0"
          >
            <span class="text-primary">{{ ingredient.name }}</span>
            <span>{{ ingredient.quantity }} {{ ingredient.unit }}</span>
          </li>
        </ul>
      </section>

      <section class="rounded-panel border border-subtle bg-surface-panel p-6 shadow-card">
        <h2 class="section-heading">Steps</h2>
        <ol class="mt-5 space-y-4">
          <li v-for="step in recipe.steps" :key="step.id" class="flex gap-4">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand-primary text-sm font-semibold text-on-accent"
            >
              {{ step.order }}
            </span>
            <p class="pt-1 text-sm leading-6 text-secondary">{{ step.instruction }}</p>
          </li>
        </ol>
      </section>
    </div>
  </section>

  <section
    v-else
    class="rounded-panel border border-dashed border-subtle bg-surface-panel px-6 py-10"
  >
    <h1 class="page-heading">Recipe not found</h1>
    <p class="mt-2 text-sm text-secondary">
      The requested recipe id, {{ route.params.id }}, is not available in the current store.
    </p>
  </section>
</template>
