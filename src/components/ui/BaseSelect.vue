<script setup lang="ts">
import { computed, useId } from 'vue'

interface SelectOption {
  label: string
  value: string | number
}

interface BaseSelectProps {
  modelValue: string | number
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  options: SelectOption[]
  placeholder?: string
  id?: string
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: undefined,
  hint: undefined,
  error: undefined,
  disabled: false,
  placeholder: '',
  id: undefined,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()

const generatedId = useId()

const selectId = computed(() => props.id ?? `select-${generatedId}`)
const hintId = computed(() => `${selectId.value}-hint`)
const errorId = computed(() => `${selectId.value}-error`)

const selectClasses = computed(() => [
  'w-full appearance-none rounded-xl border border-subtle bg-surface-panel px-4 py-2.5 pr-10 text-base text-primary focus:border-surface-accent focus:outline-none focus:ring-1 focus:ring-surface-accent disabled:bg-surface-page disabled:opacity-50 transition-colors min-h-[44px]',
  {
    'border-red-400 focus:border-red-500 focus:ring-red-500': Boolean(props.error),
    'text-secondary': props.placeholder && (props.modelValue === '' || props.modelValue === null),
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

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const matchedOption = props.options.find((option) => String(option.value) === target.value)
  emit('update:modelValue', matchedOption ? matchedOption.value : target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="selectId" class="text-sm font-medium text-primary">{{ label }}</label>

    <div class="relative">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="describedBy"
        @change="onChange"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="String(option.value)" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <svg
        class="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-secondary pointer-events-none"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <p v-if="error" :id="errorId" class="text-sm text-red-500">{{ error }}</p>
    <p v-else-if="hint" :id="hintId" class="text-sm text-secondary">{{ hint }}</p>
  </div>
</template>
