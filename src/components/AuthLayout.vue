<template>
  <main>
    <v-card class="mx-auto" width="400">
      <template v-slot:title>
        <span class="font-weight-black">{{ title }}</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        <DynamicForm :fields="fields" :submit-text="submitText" @submit="submit" />
      </v-card-text>
    </v-card>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DynamicForm from './DynamicForm.vue'
import { type IAuthForm } from '@/types/main'

export default defineComponent({
  components: {
    DynamicForm,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    fields: {
      type: Array<IAuthForm>,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
  },
  emits: ['submit'],
  setup(_, { emit }) {
    const submit = (values: Record<string, string>) => emit('submit', values)

    return {
      submit,
    }
  },
})
</script>
