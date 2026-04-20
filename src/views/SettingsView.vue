<script setup lang="ts">
import { storeToRefs } from 'pinia'

import BaseButton from '@/components/ui/BaseButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'

const themeStore = useThemeStore()
const uiStore = useUiStore()
const { currentMode, isDark } = storeToRefs(themeStore)

function previewToast() {
  uiStore.pushToast(`Theme is currently ${currentMode.value}. Toast state is wired up.`, 'success')
}
</script>

<template>
  <section class="space-y-6">
    <PageHeader title="Settings" subtitle="Theme and app preferences." />

    <div class="grid gap-4 lg:grid-cols-2">
      <article class="rounded-card border border-subtle bg-surface-panel p-6 shadow-card">
        <p class="text-xs uppercase tracking-[0.16em] text-secondary">Theme mode</p>
        <h2 class="mt-2 text-xl font-medium tracking-[-0.02em] text-primary">
          {{ isDark ? 'Dark mode' : 'Light mode' }}
        </h2>
        <p class="mt-2 text-sm text-secondary">
          Current setting is persisted locally and applied in the app shell.
        </p>

        <div class="mt-5 flex gap-3">
          <BaseButton @click="themeStore.toggleTheme()"> Toggle theme </BaseButton>
          <BaseButton variant="secondary" @click="themeStore.setMode('light')">
            Reset to light
          </BaseButton>
        </div>
      </article>

      <article class="rounded-card border border-subtle bg-surface-panel p-6 shadow-card">
        <p class="text-xs uppercase tracking-[0.16em] text-secondary">UI feedback</p>
        <h2 class="mt-2 text-xl font-medium tracking-[-0.02em] text-primary">
          Toast notifications
        </h2>
        <p class="mt-2 text-sm text-secondary">
          Trigger a toast to confirm the app-level UI store is active.
        </p>

        <BaseButton variant="secondary" class="mt-5" @click="previewToast">
          Show sample toast
        </BaseButton>
      </article>
    </div>
  </section>
</template>
