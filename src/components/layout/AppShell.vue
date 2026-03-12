<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import ToastStack from '../ui/ToastStack.vue'
import { useThemeStore } from '../../stores/theme'

type NavItem = {
  label: string
  to: string
  icon: string
  match: (path: string) => boolean
}

const route = useRoute()
const themeStore = useThemeStore()
const { currentMode } = storeToRefs(themeStore)

const primaryNav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    icon: 'https://www.figma.com/api/mcp/asset/ec0b5a05-4f67-4fe2-8466-fb21eada6f5d',
    match: (path) => path === '/',
  },
  {
    label: 'Recipes',
    to: '/menus',
    icon: 'https://www.figma.com/api/mcp/asset/dfc1254e-2da4-4081-964c-1e2e55898207',
    match: (path) => path.startsWith('/menus'),
  },
  {
    label: 'Meal Planner',
    to: '/planner',
    icon: 'https://www.figma.com/api/mcp/asset/7efbaa00-873f-41fc-84f1-91df2174c430',
    match: (path) => path.startsWith('/planner'),
  },
  {
    label: 'Shopping List',
    to: '/shopping-list',
    icon: 'https://www.figma.com/api/mcp/asset/5302d362-3013-424a-b2cb-4153db593d25',
    match: (path) => path.startsWith('/shopping-list'),
  },
  {
    label: 'Favorites',
    to: '/favorites',
    icon: 'https://www.figma.com/api/mcp/asset/f03e83e6-8012-437d-910e-960aa36a2579',
    match: (path) => path.startsWith('/favorites'),
  },
]

const settingsNav: NavItem = {
  label: 'Settings',
  to: '/settings',
  icon: 'https://www.figma.com/api/mcp/asset/f284d1a4-6bb0-4e52-aaea-f2a9d2e4469d',
  match: (path) => path.startsWith('/settings'),
}

function isActive(item: NavItem) {
  return item.match(route.path)
}
</script>

<template>
  <div class="min-h-screen bg-surface-page text-primary transition-colors md:flex" :data-theme="currentMode">
    <aside
      class="border-subtle bg-surface-panel md:sticky md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:border-r"
    >
      <div class="border-subtle border-b px-4 py-6 md:px-6">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/plated-logo.svg" alt="Plated logo" class="h-10 w-auto shrink-0" />
          <div>
            <p class="font-display text-[20px] font-semibold leading-7 tracking-[-0.03em]">
              Plated
            </p>
            <p class="text-xs text-secondary">Your Home Menu</p>
          </div>
        </RouterLink>
      </div>

      <div class="px-4 py-4 md:flex md:min-h-0 md:flex-1 md:flex-col md:px-4">
        <nav class="scrollbar-hidden flex gap-1 overflow-x-auto md:flex-col">
          <RouterLink
            v-for="item in primaryNav"
            :key="item.to"
            :to="item.to"
            class="sidebar-link shrink-0"
            :class="{ 'sidebar-link--active': isActive(item) }"
          >
            <img :src="item.icon" alt="" class="h-5 w-5 shrink-0" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="mt-3 border-subtle border-t pt-3 md:mt-auto md:pt-4">
          <RouterLink
            :to="settingsNav.to"
            class="sidebar-link"
            :class="{ 'sidebar-link--active': isActive(settingsNav) }"
          >
            <img :src="settingsNav.icon" alt="" class="h-5 w-5 shrink-0" />
            <span>{{ settingsNav.label }}</span>
          </RouterLink>
        </div>
      </div>
    </aside>

    <div class="min-w-0 flex-1">
      <main class="mx-auto w-full max-w-[1408px] px-4 py-6 md:px-10 md:py-8 xl:px-16">
        <RouterView />
      </main>
    </div>

    <ToastStack />
  </div>
</template>
