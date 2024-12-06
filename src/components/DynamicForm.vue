<template>
  <v-form @submit.prevent="submit">
    <FormField :fields="fields" />
    <v-btn class="mt-2" :text="submitText" type="submit" block></v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useForm } from 'vee-validate'
import { object, type AnySchema } from 'yup'
import { reduce } from 'lodash'
import FormField from '@/components/FormField.vue'
import { type IAuthForm } from '@/types/main'

export default defineComponent({
  components: { FormField },
  props: {
    fields: {
      type: Array<IAuthForm>,
      required: true,
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const schema = object().shape(
      reduce(
        props.fields,
        (acc, field) => {
          acc[field.name] = field.validation
          return acc
        },
        {} as Record<string, AnySchema>,
      ),
    )

    const form = useForm({
      validationSchema: schema,
    })

    const { handleSubmit, errors, resetForm } = form

    const submit = handleSubmit((values) => {
      emit('submit', values)
      resetForm()
    })

    return {
      errors,
      submit,
    }
  },
})
</script>
