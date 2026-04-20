<script setup lang="ts">
interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

defineProps<EmptyStateProps>()

defineSlots<{
  action?: () => unknown
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-primary/10 bg-surface-page/50"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-full bg-warm text-3xl mb-4 shadow-sm ring-1 ring-primary/10"
    >
      <span aria-hidden="true">{{ icon }}</span>
    </div>

    <h3 class="font-serif text-xl font-semibold text-primary mb-2">{{ title }}</h3>
    <p class="text-base text-secondary max-w-sm mb-6">{{ description }}</p>

    <slot name="action" />
  </div>
</template>
