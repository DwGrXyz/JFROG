import { ref } from 'vue'
import type { VForm } from 'vuetify/components'

export const useForm = (callback: () => Promise<void>) => {
  const form = ref<VForm>()

  const submit = () => {
    if (!form.value || !form.value.isValid) return
    callback()
  }

  return { form, submit }
}
