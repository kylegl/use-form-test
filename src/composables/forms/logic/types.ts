import type { ZodTypeAny } from 'zod'
import type { MaybeRef } from '@vueuse/core'
import type { NativeFieldValue } from './../types'

export interface ZodValidateFieldInput {
  value: MaybeRef<NativeFieldValue>
  schema?: ZodTypeAny
}

export interface UseValidatorInput {
  value?: MaybeRef<NativeFieldValue>
  showErrorEvent?: string
  callback: ValidationFn
  schema: ZodTypeAny
  validate?: MaybeRef<boolean>
}

interface ValidationResult {
  msg?: string
  success: boolean
}

export type ValidationFn = (...args: any[]) => ValidationResult
