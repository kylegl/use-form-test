import type { ComputedRef, Ref } from 'vue'
export interface FieldSchema {
  id: string
  fieldType: string
  props: {
    type?: string
    label?: string
    placeholder?: string
    flag?: string
    formatFn?: (input?: string) => string | undefined
  }
  rules?: RuleSchema[]
  attrs?: string
}
export interface RuleSchema {
  id: string
  options?: RuleOptions
}
export type FormFieldComponent = Record<string, any>

export type FormCtx = Record<string, FormFieldCtx>

export interface FormFieldCtx {
  value?: FieldValue
  rules?: FieldRuleCtx[]
  error?: Ref<boolean>
  errMsg?: ComputedRef<string | undefined>
  dirty: boolean
}

export interface FieldRuleCtx {
  ruleId: string
  isValid: Readonly<Ref<boolean>>
  errMsg?: ComputedRef<string | undefined>
}

export type FieldValue = string | number | boolean | null | undefined

export type RuleOptions = RequiredRuleOptions | MinRuleOptions

export interface RuleMeta {
  validatorFn: RuleValidatorFn
}

export interface RequiredRuleOptions {
  dependsOnField: string
}

export interface MinRuleOptions {
  min: number
}

export type UseRule = (
  fieldId: string,
  val: Ref<FormFieldCtx['value']>,
  ctx: Ref<FormCtx>,
  options?: RuleOptions
) => FieldRuleCtx

export type RuleValidatorFn = (val?: FieldValue, options?: { ctx?: FormCtx; ruleOptions?: RuleOptions }) => boolean

export type RuleValidatorFnMap = Record<string, RuleValidatorFn>

export type GetRuleErrMsgFn = (...args: any[]) => string

export type OnSubmitFn = (ctx: FormCtx) => any

export type FormatFn = (input?: FieldValue) => string | undefined
