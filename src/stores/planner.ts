import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useRecipeStore } from './recipe'
import type { MealSlot, PlannerDay, WeeklyPlanner } from '../types/app'

export const plannerDays: PlannerDay[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export const mealSlots: MealSlot[] = ['breakfast', 'lunch', 'dinner']

function createInitialPlanner(): WeeklyPlanner {
  return {
    monday: { breakfast: 'fluffy-buttermilk-pancakes', lunch: 'fresh-caesar-salad', dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: 'classic-spaghetti-carbonara' },
    wednesday: { breakfast: null, lunch: 'fresh-caesar-salad', dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: 'honey-soy-salmon-bowl' },
    friday: { breakfast: 'fluffy-buttermilk-pancakes', lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null },
  }
}

export const usePlannerStore = defineStore('planner', () => {
  const plan = ref<WeeklyPlanner>(createInitialPlanner())
  const recipeStore = useRecipeStore()

  const resolvedPlan = computed(() =>
    plannerDays.map((day) => ({
      day,
      meals: mealSlots.map((slot) => {
        const recipeId = plan.value[day][slot]
        return {
          slot,
          recipeId,
          recipe: recipeId ? recipeStore.getRecipeById(recipeId) : null,
        }
      }),
    })),
  )

  function assignRecipe(day: PlannerDay, slot: MealSlot, recipeId: string) {
    plan.value[day][slot] = recipeId
  }

  function removePlannedMeal(day: PlannerDay, slot: MealSlot) {
    plan.value[day][slot] = null
  }

  return {
    plan,
    resolvedPlan,
    assignRecipe,
    removePlannedMeal,
  }
})
