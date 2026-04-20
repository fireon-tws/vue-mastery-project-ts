<script setup lang="ts">
interface PageHeaderProps {
  title: string
  subtitle?: string
}

defineProps<PageHeaderProps>()

defineSlots<{
  actions?: () => unknown
}>()
</script>

<template>
  <header
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-ink/5"
  >
    <div class="flex flex-col gap-1">
      <h1 class="font-serif text-3xl sm:text-4xl font-bold text-primary">{{ title }}</h1>
      <p v-if="subtitle" class="text-lg text-secondary">{{ subtitle }}</p>
    </div>

    <div v-if="$slots.actions" class="flex items-center gap-3 shrink-0">
      <slot name="actions" />
    </div>
  </header>
</template>
