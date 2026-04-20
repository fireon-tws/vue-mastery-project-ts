<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="space-y-8">
    <PageHeader title="Edit Recipe" :subtitle="`Editing recipe: ${route.params.id}`" />
    <EmptyState
      icon="✏️"
      title="Coming Soon"
      description="The recipe editor is being built. Check back soon!"
    >
      <template #action>
        <BaseButton variant="secondary" to="/menus">Back to Recipes</BaseButton>
      </template>
    </EmptyState>
  </div>
</template>
