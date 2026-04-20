<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'

interface BaseInputProps {
  modelValue: string | number
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  type?: string
  placeholder?: string
  id?: string
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  disabled: false,
  type: 'text',
  placeholder: '',
  id: undefined,
  label: undefined,
  hint: undefined,
  error: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()

defineSlots<{
  'leading-icon'?: () => unknown
}>()

const generatedId = useId()
const slots = useSlots()

const inputId = computed(() => props.id ?? `input-${generatedId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)
const hasLeadingIcon = computed(() => Boolean(slots['leading-icon']))

const inputClasses = computed(() => [
  'w-full rounded-xl border border-subtle bg-surface-panel px-4 py-2.5 text-base text-primary placeholder:text-secondary focus:border-surface-accent focus:outline-none focus:ring-1 focus:ring-surface-accent border-subtle transition-colors min-h-[44px]',
  {
    'pl-10': hasLeadingIcon.value,
    'border-red-400 focus:border-red-500 focus:ring-red-500': Boolean(props.error),
  },
])

const describedBy = computed(() => {
  if (props.error) {
    return errorId.value
  }

  if (props.hint) {
    return hintId.value
  }

  return undefined
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-primary">{{ label }}</label>

    <div class="relative">
      <span
        v-if="$slots['leading-icon']"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
      >
        <slot name="leading-icon" />
      </span>

      <input
        :id="inputId"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="describedBy"
        @input="onInput"
      />
    </div>

    <p v-if="error" :id="errorId" role="alert" class="text-sm text-red-500">{{ error }}</p>
    <p v-else-if="hint" :id="hintId" class="text-sm text-secondary">{{ hint }}</p>
  </div>
</template>
