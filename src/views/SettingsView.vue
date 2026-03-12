<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useThemeStore } from '../stores/theme'
import { useUiStore } from '../stores/ui'

const themeStore = useThemeStore()
const uiStore = useUiStore()
const { currentMode, isDark } = storeToRefs(themeStore)

function previewToast() {
  uiStore.pushToast(`Theme is currently ${currentMode.value}. Toast state is wired up.`, 'success')
}
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h1 class="page-heading">Settings</h1>
      <p class="text-base text-secondary">Theme and shared UI state live in Pinia now.</p>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <article class="rounded-panel border border-subtle bg-surface-panel p-6 shadow-card">
        <p class="text-xs uppercase tracking-[0.16em] text-secondary">Theme mode</p>
        <h2 class="mt-2 text-xl font-medium tracking-[-0.02em] text-primary">
          {{ isDark ? 'Dark mode' : 'Light mode' }}
        </h2>
        <p class="mt-2 text-sm text-secondary">
          Current setting is persisted locally and applied in the app shell.
        </p>

        <div class="mt-5 flex gap-3">
          <button
            type="button"
            class="rounded-pill bg-brand-primary px-4 py-2 text-sm font-medium text-on-accent"
            @click="themeStore.toggleTheme()"
          >
            Toggle theme
          </button>
          <button
            type="button"
            class="rounded-pill border border-subtle px-4 py-2 text-sm font-medium text-primary"
            @click="themeStore.setMode('light')"
          >
            Reset to light
          </button>
        </div>
      </article>

      <article class="rounded-panel border border-subtle bg-surface-panel p-6 shadow-card">
        <p class="text-xs uppercase tracking-[0.16em] text-secondary">UI feedback</p>
        <h2 class="mt-2 text-xl font-medium tracking-[-0.02em] text-primary">Toast notifications</h2>
        <p class="mt-2 text-sm text-secondary">
          Trigger a toast to confirm the app-level UI store is active.
        </p>

        <button
          type="button"
          class="mt-5 rounded-pill border border-subtle px-4 py-2 text-sm font-medium text-primary"
          @click="previewToast"
        >
          Show sample toast
        </button>
      </article>
    </div>
  </section>
</template>
