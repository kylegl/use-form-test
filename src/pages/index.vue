<script setup lang="ts" generic="T extends any, O extends any">
import { z } from 'zod'

const test = $ref<string>()

const schema = z.string().min(3, { message: 'should be at least 3 characters' })

const { register, errorMsg, isSuccess, dirty, value, field, setFocus } = useField({ fieldName: 'test', schema })
</script>

<template>
  <div flex="~ col" justify-center items-center>
    {{ errorMsg }}
    {{ isSuccess }}
    dirty: {{ dirty }}
    <button bg-teal p3 @click="setFocus()">
      Focus
    </button>
    <VInput :ref="register" v-model="test" bg-zinc-400 w-100 rounded-lg @blur="blur = true" />
  </div>
</template>
