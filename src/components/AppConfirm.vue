<template>
  <v-dialog :model-value="modelValue" max-width="300" data-cy="confirm">
    <v-card class="pa-4">
      <div>Are you sure?</div>
      <div class="d-flex justify-space-between mt-4">
        <v-btn data-cy="cancel" @click="$emit('update:modelValue', false)">
          Cancel
        </v-btn>
        <v-btn color="red" data-cy="submit" @click="$emit('submit')">Ok</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [boolean]
  submit: []
}>()
</script>
