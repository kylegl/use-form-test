import type { ZodTypeAny } from 'zod'
import type { FormCtx } from './types'
import { validateField } from './logic/validator'

export function useField(input: UseFieldInput) {
  const { fieldName, initialValue, ctx, schema } = input

  let field = $ref<FormElement>()
  const value = computed(() => field?.value)
  const { value: val, isSuccess, errorMsg } = validateField({ value, schema })

  function register(el: FormElement) {
    field = el
    return undefined
  }

  function setFocus() {
    if (field?.setFocus)
      field?.setFocus()
  }

  const blur = ref(false)
  const dirty = computed(() => initialValue !== field?.value || blur.value)

  return {
    register,
    setFocus,
    value,
    isSuccess,
    errorMsg,
    dirty,
    blur,
    field: $$(field),
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
  error?: boolean
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
