<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
</script>

<template>
  <div class="space-y-8">
    <PageHeader title="Add New Recipe" subtitle="Save your favorite dishes to your collection." />
    <EmptyState
      icon="👨‍🍳"
      title="Coming Soon"
      description="The recipe creation form is being prepared. Check back soon!"
    >
      <template #action>
        <BaseButton variant="secondary" to="/menus">Back to Recipes</BaseButton>
      </template>
    </EmptyState>
  </div>
</template>
