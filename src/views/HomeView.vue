<script setup lang="ts">
const actionCards = [
  {
    title: 'Add New Recipe',
    description: 'Save your favorite dishes',
    tone: 'bg-brand-primary text-on-accent',
    icon: '+',
  },
  {
    title: 'Meal Planner',
    description: 'Plan your weekly meals',
    tone: 'bg-brand-secondary text-primary',
    icon: '↗',
  },
]

const recipeSections = [
  {
    title: 'Recently Cooked',
    action: 'View all recipes',
    recipes: [
      {
        name: 'Fluffy Buttermilk Pancakes',
        time: '20 min',
        difficulty: 'easy',
        tags: ['breakfast', 'quick', 'family-friendly'],
        image: 'https://www.figma.com/api/mcp/asset/334fa8b9-69e0-4b27-80ed-e91f95e99aa7',
      },
      {
        name: 'Fresh Caesar Salad',
        time: '15 min',
        difficulty: 'easy',
        tags: ['salad', 'vegetarian', 'quick'],
        image: 'https://www.figma.com/api/mcp/asset/50b73912-3b9a-4956-be87-fbb3280cec68',
      },
      {
        name: 'Classic Spaghetti Carbonara',
        time: '25 min',
        difficulty: 'medium',
        tags: ['italian', 'pasta', 'quick'],
        image: 'https://www.figma.com/api/mcp/asset/337775f3-60d3-4e02-a177-557cc596fff3',
      },
    ],
  },
  {
    title: 'Your Favorites',
    action: 'View all favorites',
    recipes: [
      {
        name: 'Classic Spaghetti Carbonara',
        time: '25 min',
        difficulty: 'medium',
        tags: ['italian', 'pasta', 'quick'],
        image: 'https://www.figma.com/api/mcp/asset/337775f3-60d3-4e02-a177-557cc596fff3',
      },
      {
        name: 'Fresh Caesar Salad',
        time: '15 min',
        difficulty: 'easy',
        tags: ['salad', 'vegetarian', 'quick'],
        image: 'https://www.figma.com/api/mcp/asset/50b73912-3b9a-4956-be87-fbb3280cec68',
      },
      {
        name: 'Fluffy Buttermilk Pancakes',
        time: '20 min',
        difficulty: 'easy',
        tags: ['breakfast', 'quick', 'family-friendly'],
        image: 'https://www.figma.com/api/mcp/asset/334fa8b9-69e0-4b27-80ed-e91f95e99aa7',
      },
    ],
  },
]
</script>

<template>
  <div class="space-y-12">
    <section class="space-y-2">
      <h1 class="display-heading max-w-[10ch]">Good afternoon!</h1>
      <p class="text-base text-secondary">What would you like to cook today?</p>
    </section>

    <section class="grid gap-4 lg:grid-cols-2">
      <article
        v-for="card in actionCards"
        :key="card.title"
        class="flex items-center justify-between rounded-card px-6 py-5"
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
      </article>
    </section>

    <section v-for="section in recipeSections" :key="section.title" class="space-y-6">
      <div class="flex items-center justify-between gap-4">
        <h2 class="section-heading">
          {{ section.title }}
        </h2>
        <button type="button" class="text-sm text-brand-primary hover:opacity-80">
          {{ section.action }}
        </button>
      </div>

      <div class="grid gap-4 xl:grid-cols-3">
        <article
          v-for="recipe in section.recipes"
          :key="`${section.title}-${recipe.name}`"
          class="overflow-hidden rounded-card border border-subtle bg-surface-panel shadow-card"
        >
          <div class="relative aspect-[41/23] overflow-hidden">
            <img :src="recipe.image" :alt="recipe.name" class="h-full w-full object-cover" />
            <button
              type="button"
              class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-pill bg-white/90 text-brand-primary shadow-sm"
            >
              ♥
            </button>
          </div>

          <div class="space-y-4 p-4">
            <h3 class="text-lg font-medium tracking-[-0.02em]">{{ recipe.name }}</h3>

            <div class="flex items-center gap-3 text-sm text-secondary">
              <span class="flex items-center gap-1">
                <img
                  src="https://www.figma.com/api/mcp/asset/981224f5-23a2-4773-bbc7-410bdccbb6d2"
                  alt=""
                  class="h-4 w-4"
                />
                {{ recipe.time }}
              </span>
              <span
                class="rounded-pill px-2 py-0.5 text-[11px] capitalize"
                :class="
                  recipe.difficulty === 'easy' ? 'bg-success text-success' : 'bg-warning text-warning'
                "
              >
                {{ recipe.difficulty }}
              </span>
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
      </div>
    </section>
  </div>
</template>
