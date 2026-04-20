<script setup lang="ts">
import { computed } from 'vue'

import type { BadgeTone } from '@/types/components'

interface BaseBadgeProps {
  tone?: BadgeTone
}

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  tone: 'neutral',
})

defineSlots<{
  default?: () => unknown
  icon?: () => unknown
}>()

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-primary/5 text-primary',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-warm text-[#d97706]',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-secondary/20 text-[#216d70]',
}

const classes = computed(() => [
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
  toneClasses[props.tone],
])
</script>

<template>
  <span :class="classes">
    <slot name="icon" />
    <slot />
  </span>
</template>
