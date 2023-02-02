import type { ZodTypeAny } from 'zod'
import type { FormCtx } from './types'
import { validateField } from './logic/validator'

export function useField(input: UseFieldInput) {
  const { fieldName, initialValue, ctx, schema } = input

  let field = $ref<FormElement>()
  const value = computed(() => field?.value)
  const blur = ref(false)

  const { value: val, isSuccess, zodErrorMsg } = validateField({ value, schema })

  function register(el: FormElement) {
    field = el
    return undefined
  }

  function setFocus() {
    if (field?.setFocus)
      field?.setFocus()
  }

  function reset() {
    if (field?.value)
      field.value = initialValue
  }

  const showErrorMsg = computed(() => blur.value)
  const dirty = computed(() => initialValue !== field?.value)
  const errorMsg = computed(() => showErrorMsg && !isSuccess ? zodErrorMsg?.value : undefined)

  watch(errorMsg, () => {
    if (field?.errorMsg)
      field.errorMsg = errorMsg.value
  })

  return {
    register,
    setFocus,
    dirty,
    reset,
  }
}

interface UseFieldInput {
  fieldName?: string
  initialValue?: NativeFieldValue
  schema?: ZodTypeAny
  ctx?: FormCtx
}

interface FormElement {
  value: any
  errorMsg?: string
  setFocus?: () => void
}

export type InternalFieldName = string

export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

export type FieldValue<TFieldValues extends FieldValues> =
  TFieldValues[InternalFieldName]

export type FieldValues = Record<string, any>

export type NativeFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | unknown[]
