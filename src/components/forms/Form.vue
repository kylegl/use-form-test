<script setup lang="ts">
import { z } from 'zod'
import { zodValidator } from '~/composables/forms/logic/validator'
import type { UseFormInput } from '~/composables/forms/types'

const defaultValues = {
  name: 'ted',
  email: 'ted@ted.com',
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'bro 2 letters?' }),
  email: z.string().email({ message: 'invalid email' }),
})

const formInput: UseFormInput<typeof formSchema> = {
  defaultValues,
  fieldsSchema: formSchema,
  validator: zodValidator,
}
const { name, isDirty, isValid, disabled } = useForm(formInput)

function disable() {
  disabled.value = true
}
</script>

<template>
  <div v-if="name?.fieldValue">
    <div flex="~ col">
      <div>
        ErrorMsg: {{ name.errorMsg }}
      </div>
      <div>
        dirty?: {{ isDirty }}
        name dirty?: {{ name.isDirty.value }}
      </div>
      <div>
        isValid: {{ isValid }}
      </div>

    </div>
    <button @click="disable">disable</button>
    <FormField v-model="name.fieldValue.value" :error-msg="name.errorMsg?.value" :register="name.register" :disabled="disabled" />
  </div>
</template>
