<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeUnmount } from 'vue'

import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const { toasts } = storeToRefs(uiStore)
const timers = new Map<number, number>()

function queueRemoval(id: number) {
  if (timers.has(id) || typeof window === 'undefined') {
    return
  }

  const timer = window.setTimeout(() => {
    uiStore.removeToast(id)
    timers.delete(id)
  }, 3200)

  timers.set(id, timer)
}

function clearTimer(id: number) {
  const timer = timers.get(id)
  if (timer && typeof window !== 'undefined') {
    window.clearTimeout(timer)
  }
  timers.delete(id)
}

onBeforeUnmount(() => {
  timers.forEach((timer) => {
    if (typeof window !== 'undefined') {
      window.clearTimeout(timer)
    }
  })
  timers.clear()
})
</script>

<template>
  <div class="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto rounded-card border px-4 py-3 shadow-floating"
        :class="{
          'border-subtle bg-surface-panel text-primary': toast.tone === 'info',
          'border-transparent bg-success text-success': toast.tone === 'success',
          'border-transparent bg-warning text-warning': toast.tone === 'warning',
          'border-transparent bg-danger text-danger': toast.tone === 'danger',
        }"
        @vue:mounted="queueRemoval(toast.id)"
      >
        <div class="flex items-start gap-3">
          <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>
          <button
            type="button"
            class="text-xs uppercase tracking-[0.12em] opacity-70 transition-opacity hover:opacity-100"
            @click="clearTimer(toast.id); uiStore.removeToast(toast.id)"
          >
            Close
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>
