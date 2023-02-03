<script setup lang="ts">
interface Props {
  tooltip?: string
  duration?: number
}
const { tooltip, duration = 800 } = defineProps<Props>()
const emit = defineEmits(['click'])
let isClicked = $ref(false)

function emitClick() {
  emit('click')
  isClicked = false
}
const { start, isPending } = useTimeoutFn(() => emitClick(), duration, { immediate: false })

function handleClick() {
  isClicked = true
  start()
}
</script>

<template>
  <div>
    <button  flex items-center justify-center :class="{ disabled: isPending }"
      @click="handleClick">
      <slot name="content" :is-clicked="isClicked" />
    </button>
  </div>
</template>
