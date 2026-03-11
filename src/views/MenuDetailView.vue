<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Recipe Details: {{ route.params.id }}</h2>
    <p class="text-slate-600">View details for a specific recipe.</p>
  </div>
</template>
