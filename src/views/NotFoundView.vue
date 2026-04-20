<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center">
    <EmptyState
      icon="🧭"
      title="404 — Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
    >
      <template #action>
        <BaseButton variant="primary" to="/">Go back home</BaseButton>
      </template>
    </EmptyState>
  </div>
</template>
