import type { FormElement } from './forms/useField'

export function useTest(defaultValue: string | undefined) {
  const initialValue = ref(defaultValue)
  const fieldNode = ref<FormElement>()
  const input = computed(() => fieldNode.value?.input)
  const { focused } = useFocus(input)
  const errMsg = 'this is error'
  const isDirty = computed(() => fieldNode.value?.value !== initialValue.value)
  const isRegistered = ref(false)

  function register(target: FormElement) {
    fieldNode.value = target

    return fieldNode
  }

  function setFocus() {
    focused.value = true
  }

  function setInitialValues() {
    debugger
    if (!fieldNode.value?.value)
      return

    if (defaultValue)
      fieldNode.value.value = defaultValue

    if (!defaultValue)
      initialValue.value = fieldNode.value.input.value
  }

  const cleanup = useEventListener(input, 'blur', () => console.log('blur'))

  function setValue() {
    if (fieldNode.value?.value)
      fieldNode.value.value = defaultValue
  }

  function setError() {
    if (fieldNode.value?.errorMsg)
      return

    console.log('error type', isRef(fieldNode.value?.errorMsg))
    fieldNode.value!.errorMsg = errMsg
  }

  // watchEffect(() => setValue('errorMsg', errMsg))
  watch(fieldNode, () => {
    if (fieldNode.value?.value)
      setInitialValues()
  }, {
    flush: 'post',
    onTrigger(e) {
      debugger
    },
  })
  function unregister() {
    cleanup()
  }

  onUnmounted(() => unregister())

  return {
    register,
    fieldNode,
    initialValue,
    focused,
    setFocus,
    setError,
    setValue,
    isDirty,
  }
}
