import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { ThemeMode } from '../types/app'

const themeStorageKey = 'plated-theme-mode'

function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedMode = window.localStorage.getItem(themeStorageKey)
  return savedMode === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(readInitialMode())
  const currentMode = computed(() => mode.value)
  const isDark = computed(() => mode.value === 'dark')

  function persist(nextMode: ThemeMode) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(themeStorageKey, nextMode)
    }
  }

  function setMode(nextMode: ThemeMode) {
    mode.value = nextMode
    persist(nextMode)
  }

  function toggleTheme() {
    setMode(mode.value === 'light' ? 'dark' : 'light')
  }

  return {
    mode,
    currentMode,
    isDark,
    setMode,
    toggleTheme,
  }
})
