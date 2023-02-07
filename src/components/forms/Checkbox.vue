<script setup lang="ts">
interface Props {
  tooltip?: string
  modelValue?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
})
const emit = defineEmits(['update:modelValue'])
debugger
const value = $(useVModel(props, 'modelValue', emit, { passive: true }))
const test = ref(false)
const toggle = useToggle($$(value))

defineExpose({ value })
</script>

<template>
  <div>
    <label v-if="label" t5> {{ label }}</label>
    <Btn :tooltip="tooltip" :duration="50" flex items-center justify-center @click="toggle">
      <template #content>
        <!-- <QuickFade> -->
        <Icon v-if="!value" i-carbon:checkbox text-xl />
        <Icon v-else i-ci:check-bold text-xl text-green />
        <!-- </QuickFade> -->
      </template>
    </Btn>
  </div>
</template>
