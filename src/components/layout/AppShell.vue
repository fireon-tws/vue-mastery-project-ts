<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { LayoutDashboard, BookOpen, Calendar, ShoppingCart, Heart, Settings } from 'lucide-vue-next'

import ToastStack from '@/components/ui/ToastStack.vue'
import { useThemeStore } from '@/stores/theme'
import type { NavItem } from '@/types/app'

const route = useRoute()
const themeStore = useThemeStore()
const { currentMode } = storeToRefs(themeStore)

const primaryNav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
    match: (path) => path === '/',
  },
  {
    label: 'Recipes',
    to: '/menus',
    icon: BookOpen,
    match: (path) => path.startsWith('/menus'),
  },
  {
    label: 'Meal Planner',
    to: '/planner',
    icon: Calendar,
    match: (path) => path.startsWith('/planner'),
  },
  {
    label: 'Shopping List',
    to: '/shopping-list',
    icon: ShoppingCart,
    match: (path) => path.startsWith('/shopping-list'),
  },
  {
    label: 'Favorites',
    to: '/favorites',
    icon: Heart,
    match: (path) => path.startsWith('/favorites'),
  },
]

const settingsNav: NavItem = {
  label: 'Settings',
  to: '/settings',
  icon: Settings,
  match: (path) => path.startsWith('/settings'),
}

function isActive(item: NavItem) {
  return item.match(route.path)
}
</script>

<template>
  <div
    class="min-h-screen bg-surface-page text-primary transition-colors md:flex"
    :data-theme="currentMode"
  >
    <aside
      class="hidden border-subtle bg-surface-panel md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col md:border-r shadow-card"
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
            <component :is="item.icon" class="h-5 w-5 shrink-0" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="mt-3 border-subtle border-t pt-3 md:mt-auto md:pt-4">
          <RouterLink
            :to="settingsNav.to"
            class="sidebar-link"
            :class="{ 'sidebar-link--active': isActive(settingsNav) }"
          >
            <component :is="settingsNav.icon" class="h-5 w-5 shrink-0" />
            <span>{{ settingsNav.label }}</span>
          </RouterLink>
        </div>
      </div>
    </aside>

    <div class="min-w-0 flex-1 md:pl-64">
      <main
        class="mx-auto w-full max-w-[1408px] px-4 py-6 pb-24 md:px-10 md:py-8 md:pb-0 xl:px-16"
      >
        <RouterView />
      </main>
    </div>

    <nav
      class="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-subtle bg-surface-panel/90 px-4 pb-6 pt-2 shadow-floating backdrop-blur-md md:hidden"
    >
      <RouterLink
        v-for="item in [...primaryNav, settingsNav]"
        :key="item.to"
        :to="item.to"
        class="flex min-w-[44px] min-h-[44px] flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-xs text-secondary transition-colors"
        :class="{ 'text-primary': isActive(item) }"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <span class="truncate">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <ToastStack />
  </div>
</template>
