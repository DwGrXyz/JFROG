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
