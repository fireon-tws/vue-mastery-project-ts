<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
</script>

<template>
  <div class="space-y-8">
    <PageHeader title="Shopping List" subtitle="Auto-generated from your meal plan." />
    <EmptyState
      icon="🛒"
      title="No Items Yet"
      description="Plan some meals first, then your shopping list will appear here."
    >
      <template #action>
        <BaseButton variant="primary" to="/planner">Go to Planner</BaseButton>
      </template>
    </EmptyState>
  </div>
</template>
