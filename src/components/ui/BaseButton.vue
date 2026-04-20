<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { ButtonSize, ButtonVariant } from '@/types/components'

type ButtonAs = 'button' | 'a'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: ButtonAs
  to?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()

defineSlots<{
  default?: () => unknown
  'leading-icon'?: () => unknown
  'trailing-icon'?: () => unknown
}>()

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 min-h-[32px]',
  md: 'text-base px-5 py-2.5 min-h-[44px]',
  lg: 'text-lg px-6 py-3 min-h-[52px]',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-surface-accent text-on-accent shadow-card hover:opacity-90',
  secondary: 'bg-surface-panel text-primary border border-subtle shadow-sm hover:bg-brand-warm',
  ghost: 'bg-transparent text-primary hover:bg-brand-warm/50',
  danger: 'bg-danger text-danger hover:opacity-90',
}

const isDisabled = computed(() => props.disabled || props.loading)
const isLinkLike = computed(() => Boolean(props.to) || props.as === 'a')
const componentTag = computed(() => {
  if (props.to) {
    return RouterLink
  }

  return props.as === 'a' ? 'a' : 'button'
})

const linkTarget = computed(() => {
  if (!props.to || isDisabled.value) {
    return undefined
  }

  return props.to
})

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
  sizeClasses[props.size],
  variantClasses[props.variant],
  {
    'pointer-events-none opacity-50 cursor-not-allowed active:scale-100':
      isDisabled.value && isLinkLike.value,
  },
])

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <component
    :is="componentTag"
    :to="linkTarget"
    :type="!to && as === 'button' ? 'button' : undefined"
    :disabled="!to && as === 'button' ? isDisabled : undefined"
    :aria-disabled="isLinkLike ? String(isDisabled) : undefined"
    :tabindex="isLinkLike && isDisabled ? -1 : undefined"
    :class="classes"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.2" stroke-width="4" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
    <span v-if="loading" class="sr-only" aria-live="polite">Loading...</span>
    <slot v-else name="leading-icon" />

    <slot />

    <slot v-if="!loading" name="trailing-icon" />
  </component>
</template>
