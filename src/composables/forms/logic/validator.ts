import type { SafeParseError } from 'zod'
import type { ValidateFieldInput } from './types'

export function validateField({ value, schema }: ValidateFieldInput) {
  const parsed = computed(() => schema ? schema.safeParse(unref(value)) : undefined)
  const isSuccess = computed(() => parsed.value?.success ?? true)
  const zodErrorMsg = computed(() => parsed.value && !parsed.value?.success
    ? getErrorMsg(parsed.value)
    : undefined)

  return {
    value,
    isSuccess,
    zodErrorMsg,
  }
}

function getErrorMsg<T extends SafeParseError<any>>(zodOutput: T) {
  return zodOutput.error.format()._errors[0]
}
