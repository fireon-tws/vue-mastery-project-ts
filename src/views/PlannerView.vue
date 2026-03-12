<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePlannerStore } from '../stores/planner'
import { useRecipeStore } from '../stores/recipe'
import type { MealSlot, PlannerDay } from '../types/app'

const plannerStore = usePlannerStore()
const recipeStore = useRecipeStore()

const { resolvedPlan } = storeToRefs(plannerStore)
const { recipes } = storeToRefs(recipeStore)

function labelDay(day: PlannerDay) {
  return `${day.slice(0, 1).toUpperCase()}${day.slice(1)}`
}

function labelMeal(slot: MealSlot) {
  return `${slot.slice(0, 1).toUpperCase()}${slot.slice(1)}`
}
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h1 class="page-heading">Meal Planner</h1>
      <p class="text-base text-secondary">
        Assign saved recipes to breakfast, lunch, and dinner across the week.
      </p>
    </div>

    <div class="grid gap-4">
      <article
        v-for="day in resolvedPlan"
        :key="day.day"
        class="rounded-panel border border-subtle bg-surface-panel p-5 shadow-card"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-medium tracking-[-0.02em]">{{ labelDay(day.day) }}</h2>
          <p class="text-xs uppercase tracking-[0.16em] text-secondary">3 meal slots</p>
        </div>

        <div class="grid gap-3 lg:grid-cols-3">
          <div
            v-for="meal in day.meals"
            :key="`${day.day}-${meal.slot}`"
            class="rounded-card bg-brand-warm p-4"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <p class="text-sm font-medium text-primary">{{ labelMeal(meal.slot) }}</p>
              <button
                v-if="meal.recipeId"
                type="button"
                class="text-xs uppercase tracking-[0.14em] text-secondary"
                @click="plannerStore.removePlannedMeal(day.day, meal.slot)"
              >
                Clear
              </button>
            </div>

            <select
              class="w-full rounded-card border border-subtle bg-surface-panel px-3 py-2 text-sm text-primary"
              :value="meal.recipeId ?? ''"
              @change="
                ($event) => {
                  const value = ($event.target as HTMLSelectElement).value
                  if (value) {
                    plannerStore.assignRecipe(day.day, meal.slot, value)
                  } else {
                    plannerStore.removePlannedMeal(day.day, meal.slot)
                  }
                }
              "
            >
              <option value="">No recipe selected</option>
              <option v-for="recipe in recipes" :key="recipe.id" :value="recipe.id">
                {{ recipe.name }}
              </option>
            </select>

            <p class="mt-3 text-sm text-secondary">
              {{ meal.recipe ? `${meal.recipe.name} · ${meal.recipe.servings} servings` : 'Open slot for something new.' }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
