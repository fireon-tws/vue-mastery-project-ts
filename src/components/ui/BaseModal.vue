<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import { X } from 'lucide-vue-next'

import type { ModalSize } from '@/types/components'

type BaseModalSize = Extract<ModalSize, 'sm' | 'md' | 'lg'>

interface BaseModalProps {
  isOpen: boolean
  title: string
  size?: BaseModalSize
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  size: 'md',
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

defineSlots<{
  default?: () => unknown
  footer?: () => unknown
}>()

const slots = useSlots()
const panelRef = ref<HTMLElement | null>(null)
const previouslyFocusedElement = ref<HTMLElement | null>(null)

const sizeClasses: Record<BaseModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

const panelClasses = computed(() => [
  'relative w-full overflow-hidden rounded-card bg-surface-panel shadow-modal',
  sizeClasses[props.size],
])

function closeModal() {
  emit('close')
}

function getFocusableElements() {
  if (!panelRef.value) {
    return [] as HTMLElement[]
  }

  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(panelRef.value.querySelectorAll<HTMLElement>(selectors)).filter((element) => {
    return element.offsetParent !== null
  })
}

async function focusFirstElement() {
  await nextTick()

  const focusable = getFocusableElements()

  if (focusable.length === 0) {
    panelRef.value?.focus()
    return
  }

  focusable[0]!.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.isOpen) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    closeModal()
    return
  }

  if (event.key !== 'Tab') {
    return
  }

  const focusable = getFocusableElements()

  if (focusable.length === 0) {
    event.preventDefault()
    return
  }

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  const active = document.activeElement

  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
    return
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    if (isOpen) {
      previouslyFocusedElement.value = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', handleKeydown)
      await focusFirstElement()
      return
    }

    document.removeEventListener('keydown', handleKeydown)
    previouslyFocusedElement.value?.focus()
  },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[var(--z-modal-backdrop)] bg-ink/20 backdrop-blur-sm"
        @click="closeModal"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 sm:p-6"
        @click.self="closeModal"
      >
        <div
          ref="panelRef"
          :class="panelClasses"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
        >
          <header class="flex items-center justify-between px-6 py-4 border-b border-ink/5">
            <h2 class="font-serif text-xl font-semibold text-primary">{{ title }}</h2>
            <button
              type="button"
              class="rounded-full p-2 text-secondary hover:bg-surface-page transition-colors"
              aria-label="Close"
              @click="closeModal"
            >
              <X class="size-5" aria-hidden="true" />
            </button>
          </header>

          <div class="px-6 py-6">
            <slot />
          </div>

          <footer
            v-if="slots.footer"
            class="bg-surface-page px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
