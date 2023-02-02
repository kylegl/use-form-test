<script setup lang="ts">
import type { FormatFn } from '~/composables/forms/types'

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean
  placeholder?: string
  disabled?: boolean
  label?: string
  type?: string
  error?: boolean
  errorMsg?: string
  dirty?: boolean
  flag?: string
  attrs?: any
  formatFn?: FormatFn
}>(), {
  disabled: false,
  type: 'text',
})

const emit = defineEmits(['update:modelValue', 'enter', 'focus', 'blur'])
const input = $ref<HTMLInputElement>()
let value = $(useVModel(props, 'modelValue', emit, { passive: true }))
const errorMsg = $(useVModel(props, 'errorMsg', emit, { passive: true }))

function setFocus() {
  input?.focus()
}

watchEffect(() => {
  if (!props.formatFn)
    return

  value = props.formatFn(value)
})
defineExpose({ value: $$(value), errorMsg: $$(errorMsg), setFocus })
</script>

<template>
  <div min-w-60>
    <div flex gap2>
      <label v-if="label" :class="error ? 'label-text-error' : 'label-text'"> {{ label }}</label>
      <div v-if="flag" text-sm text-brandBlue text-op-50 ml-auto self-end>
        {{ flag }}
      </div>
    </div>
    <div flex gap2 max-h-fit border-input in-out p2 :class="attrs">
      <slot name="before" />
      <input
        ref="input"
        v-model="value" w-full bg-transparent in-out placeholder:t-brand1 placeholder:text-op-40
        class="focus:outline-none" :placeholder="placeholder" :type="type" :disabled="disabled"
        @keydown.enter="emit('enter')" @focus="emit('focus')" @blur="emit('blur')"
      >
      <slot name="after" />
    </div>
    <div min-h-4>
      <div v-if="error && dirty" text-sm text-red h-4>
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>
