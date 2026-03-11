<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center py-12">
    <h2 class="text-4xl font-bold text-slate-900 mb-4">404 - Page Not Found</h2>
    <p class="text-slate-600 mb-8">The page you are looking for does not exist.</p>
    <RouterLink to="/" class="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
      Go back home
    </RouterLink>
  </div>
</template>
