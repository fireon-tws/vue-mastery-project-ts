<script setup lang="ts">
import type { MenuRecipe } from '../../types/app'

defineProps<{
  recipe: MenuRecipe
}>()

defineEmits<{
  toggleFavorite: [id: string]
}>()

function formatDuration(recipe: MenuRecipe) {
  return `${recipe.prepTime + recipe.cookTime} min`
}
</script>

<template>
  <article class="overflow-hidden rounded-card border border-subtle bg-surface-panel shadow-card">
    <div class="relative aspect-[41/23] overflow-hidden">
      <img :src="recipe.image" :alt="recipe.name" class="h-full w-full object-cover" />
      <button
        type="button"
        class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-pill bg-white/90 text-brand-primary shadow-sm transition-transform hover:scale-105"
        :aria-pressed="recipe.isFavorite"
        :aria-label="recipe.isFavorite ? `Remove ${recipe.name} from favorites` : `Add ${recipe.name} to favorites`"
        @click="$emit('toggleFavorite', recipe.id)"
      >
        {{ recipe.isFavorite ? '♥' : '♡' }}
      </button>
    </div>

    <div class="space-y-4 p-4">
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-[0.18em] text-secondary">{{ recipe.category }}</p>
        <h3 class="text-lg font-medium tracking-[-0.02em]">{{ recipe.name }}</h3>
      </div>

      <div class="flex flex-wrap items-center gap-3 text-sm text-secondary">
        <span class="flex items-center gap-1">
          <img
            src="https://www.figma.com/api/mcp/asset/981224f5-23a2-4773-bbc7-410bdccbb6d2"
            alt=""
            class="h-4 w-4"
          />
          {{ formatDuration(recipe) }}
        </span>
        <span
          class="rounded-pill px-2 py-0.5 text-[11px] capitalize"
          :class="
            recipe.difficulty === 'easy'
              ? 'bg-success text-success'
              : recipe.difficulty === 'medium'
                ? 'bg-warning text-warning'
                : 'bg-danger text-danger'
          "
        >
          {{ recipe.difficulty }}
        </span>
        <span>{{ recipe.servings }} servings</span>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in recipe.tags"
          :key="tag"
          class="rounded-pill bg-brand-warm px-2 py-0.5 text-[11px] text-primary"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
