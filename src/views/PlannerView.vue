<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { usePlannerStore } from '@/stores/planner'
import { useRecipeStore } from '@/stores/recipe'
import type { MealSlot, PlannerDay } from '@/types/app'

const plannerStore = usePlannerStore()
const recipeStore = useRecipeStore()

const { resolvedPlan } = storeToRefs(plannerStore)
const { recipes } = storeToRefs(recipeStore)

const recipeOptions = computed(() =>
  recipes.value.map((recipe) => ({
    label: recipe.name,
    value: recipe.id,
  })),
)

function labelDay(day: PlannerDay) {
  return `${day.slice(0, 1).toUpperCase()}${day.slice(1)}`
}

function labelMeal(slot: MealSlot) {
  return `${slot.slice(0, 1).toUpperCase()}${slot.slice(1)}`
}

function updateMeal(day: PlannerDay, slot: MealSlot, value: string | number) {
  const recipeId = String(value)

  if (recipeId) {
    plannerStore.assignRecipe(day, slot, recipeId)
    return
  }

  plannerStore.removePlannedMeal(day, slot)
}
</script>

<template>
  <section class="space-y-6">
    <PageHeader
      title="Meal Planner"
      subtitle="Assign saved recipes to breakfast, lunch, and dinner across the week."
    />

    <div class="grid gap-4">
      <article
        v-for="day in resolvedPlan"
        :key="day.day"
        class="rounded-card border border-subtle bg-surface-panel p-5 shadow-card"
      >
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-medium tracking-[-0.02em]">{{ labelDay(day.day) }}</h2>
          <p class="text-xs uppercase tracking-[0.16em] text-secondary">3 meal slots</p>
        </div>

        <div class="grid gap-3 lg:grid-cols-3">
          <div
            v-for="meal in day.meals"
            :key="`${day.day}-${meal.slot}`"
            class="rounded-xl bg-surface-page p-3"
          >
            <div class="mb-3 flex items-center justify-between gap-3">
              <p class="text-sm font-medium text-primary">{{ labelMeal(meal.slot) }}</p>
              <BaseButton
                v-if="meal.recipeId"
                variant="ghost"
                size="sm"
                @click="plannerStore.removePlannedMeal(day.day, meal.slot)"
              >
                Clear
              </BaseButton>
            </div>

            <BaseSelect
              :model-value="meal.recipeId ?? ''"
              :options="recipeOptions"
              placeholder="No recipe selected"
              @update:model-value="(value) => updateMeal(day.day, meal.slot, value)"
            />

            <p class="mt-3 text-sm text-secondary">
              {{
                meal.recipe
                  ? `${meal.recipe.name} · ${meal.recipe.servings} servings`
                  : 'Open slot for something new.'
              }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
