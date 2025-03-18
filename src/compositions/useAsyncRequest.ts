import { ref, type Ref } from 'vue'

export const useAsyncRequest = (
  callback: () => Promise<unknown>,
): [Ref<boolean>, () => Promise<void>] => {
  const pending = ref(false)

  const run = async () => {
    pending.value = true
    await callback()
    pending.value = false
  }

  return [pending, run]
}

export const useAsyncDataFetch = <T>(
  defaultData: T,
  callback: () => Promise<unknown>,
): [Ref<T>, Ref<boolean>] => {
  const data = ref<T>(defaultData)
  const [pending, run] = useAsyncRequest(async () => {
    const result = await callback()
    data.value = result
  })
  run()

  return [data as Ref<T>, pending]
}
