<template>
  <v-btn @click="addMore"> Add More </v-btn>
  <v-form @submit.prevent="submit">
    <template v-for="(field, index) in fieldItems" :key="field.key">
      <FormArrayField :fields="fields" :field="field" :index="index" :errors="errors" />
    </template>
    <v-btn class="mt-2" :text="submitText" type="submit" block></v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFieldArray, useForm } from 'vee-validate'
import { object, array, type AnySchema } from 'yup'
import { reduce } from 'lodash'
import FormArrayField from '@/components/FormArrayField.vue'
import { type IAuthForm } from '@/types/main'

export default defineComponent({
  components: { FormArrayField },
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
    const initialValues = reduce(
      props.fields,
      (acc, field) => ((acc[field.name] = ''), acc),
      {} as Record<string, string>,
    )

    const schema = object().shape({
      items: array()
        .of(
          object().shape(
            reduce(
              props.fields,
              (acc, field) => ((acc[field.name] = field.validation), acc),
              {} as Record<string, AnySchema>,
            ),
          ),
        )
        .strict(),
    })

    const { errors, handleSubmit, resetForm } = useForm({
      validationSchema: schema,
      initialValues: { items: [initialValues] },
    })

    const submit = handleSubmit((values) => {
      emit('submit', values)
      resetForm()
    })

    const { fields: fieldItems, push } = useFieldArray('items')
    const addMore = () => push({ ...initialValues })

    return {
      errors,
      fieldItems,
      submit,
      addMore,
    }
  },
})
</script>
