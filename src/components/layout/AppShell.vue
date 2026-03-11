<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <RouterLink to="/" class="text-xl font-bold text-brand-600 flex items-center gap-2">
            <span class="text-2xl">🍽️</span> Plated
          </RouterLink>
          <div class="hidden md:flex items-center gap-1">
            <RouterLink
              to="/menus"
              class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              active-class="bg-brand-50 text-brand-700 hover:bg-brand-100 hover:text-brand-800"
            >
              My Menus
            </RouterLink>
            <RouterLink
              to="/planner"
              class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              active-class="bg-brand-50 text-brand-700 hover:bg-brand-100 hover:text-brand-800"
            >
              Planner
            </RouterLink>
          </div>
        </div>
        <div>
          <RouterLink
            to="/menus/new"
            class="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 bg-brand-600 text-white hover:bg-brand-700 h-9 px-4 py-2 shadow-sm"
          >
            Add Recipe
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
