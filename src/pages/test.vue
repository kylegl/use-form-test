<script setup lang="ts">
import type { FormElement } from '~/composables/forms/useField'
const test = ref<FormElement | null>(null)
const testVal = computed(() => test.value?.value)

// const cleanup = useEventListener(test, 'focusout', e => console.log('event', e))

const {
  register,
  fieldNode,
  initialValue,
  setError,
  focused,
  setFocus,
  setValue,
  isDirty,
} = useTest('belly button')
</script>

<template>
  <div>
    <div flex="~ col" gap1>
      <div>
        focused:
        {{ focused }}
      </div>
      <div>
        dirty: {{ isDirty }}
      </div>
    </div>
    <button p2 rounded-lg bg-teal @click="setError">
      Set Error
    </button>
    <button p2 rounded-lg bg-teal @click="setValue">
      Set Value
    </button>
    <VInput :ref="register" />
    <VInput />
  </div>
</template>
