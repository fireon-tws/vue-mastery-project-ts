<script setup lang="ts">
import { Clock, Heart } from 'lucide-vue-next'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import type { BadgeTone } from '@/types/components'
import type { MenuRecipe } from '@/types/app'

defineProps<{
  recipe: MenuRecipe
}>()

defineEmits<{
  toggleFavorite: [id: string]
}>()

function formatDuration(recipe: MenuRecipe) {
  return `${recipe.prepTime + recipe.cookTime} min`
}

function difficultyTone(difficulty: string): BadgeTone {
  if (difficulty === 'easy') {
    return 'success'
  }

  if (difficulty === 'medium') {
    return 'warning'
  }

  return 'danger'
}
</script>

<template>
  <article class="overflow-hidden rounded-card border border-subtle bg-surface-panel shadow-card">
    <div class="relative aspect-[41/23] overflow-hidden">
      <img :src="recipe.image" :alt="recipe.name" loading="lazy" class="h-full w-full object-cover" />
      <button
        type="button"
        class="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-pill bg-surface-panel/90 text-surface-accent shadow-sm transition-transform hover:scale-105"
        :aria-pressed="recipe.isFavorite"
        :aria-label="
          recipe.isFavorite
            ? `Remove ${recipe.name} from favorites`
            : `Add ${recipe.name} to favorites`
        "
        @click="$emit('toggleFavorite', recipe.id)"
      >
        <Heart
          class="h-5 w-5"
          :class="{ 'fill-current text-surface-accent': recipe.isFavorite }"
        />
      </button>
    </div>

    <div class="space-y-4 p-4">
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-[0.18em] text-secondary">{{ recipe.category }}</p>
        <h3 class="text-lg font-medium tracking-[-0.02em]">{{ recipe.name }}</h3>
      </div>

      <div class="flex flex-wrap items-center gap-3 text-sm text-secondary">
        <span class="flex items-center gap-1">
          <Clock class="h-4 w-4" />
          {{ formatDuration(recipe) }}
        </span>
        <BaseBadge :tone="difficultyTone(recipe.difficulty)" class="capitalize">
          {{ recipe.difficulty }}
        </BaseBadge>
        <span>{{ recipe.servings }} servings</span>
      </div>

      <div class="flex flex-wrap gap-2">
        <BaseBadge v-for="tag in recipe.tags" :key="tag" tone="neutral">
          {{ tag }}
        </BaseBadge>
      </div>
    </div>
  </article>
</template>
