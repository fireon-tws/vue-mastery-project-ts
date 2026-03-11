<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="space-y-2">
    <h1 class="page-heading">Recipe Details: {{ route.params.id }}</h1>
    <p class="text-base text-secondary">View details for a specific recipe.</p>
  </section>
</template>
