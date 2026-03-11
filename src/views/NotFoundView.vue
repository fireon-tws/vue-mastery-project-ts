<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center py-12">
    <h2 class="section-heading mb-4">404 - Page Not Found</h2>
    <p class="mb-8 text-secondary">The page you are looking for does not exist.</p>
    <RouterLink
      to="/"
      class="inline-flex rounded-card bg-brand-primary px-6 py-3 text-on-accent transition-opacity hover:opacity-90"
    >
      Go back home
    </RouterLink>
  </div>
</template>
