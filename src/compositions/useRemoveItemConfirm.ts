import { ref } from 'vue'

export const useRemoveItemConfirm = (
  callback: (id: string) => Promise<void>,
) => {
  const removeConfirmShown = ref(false)
  const removeItemId = ref('')

  const showRemoveConfirm = (id: string) => {
    removeConfirmShown.value = true
    removeItemId.value = id
  }

  const remove = () => {
    removeConfirmShown.value = false
    callback(removeItemId.value)
  }

  return {
    removeConfirmShown,
    showRemoveConfirm,
    remove,
  }
}
