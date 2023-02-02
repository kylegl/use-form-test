import type { ZodTypeAny } from 'zod'
import type { MaybeRef } from '@vueuse/core'
import type { NativeFieldValue } from './../useField'

export interface ValidateFieldInput {
  value: MaybeRef<NativeFieldValue>
  schema?: ZodTypeAny
}
