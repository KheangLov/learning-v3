<template>
  <template v-for="(field, idx) in fieldProps" :key="idx">
    <v-text-field
      v-model="field.value.value"
      :label="field.item.label"
      :type="field.item.type"
      :error-messages="field.errorMessage.value"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useField } from 'vee-validate'
import { reduce } from 'lodash'
import { type IAuthForm } from '@/types/main'

export default defineComponent({
  props: {
    fields: {
      type: Array<IAuthForm>,
      required: true,
    },
  },
  setup(props) {
    const fieldProps = reduce(
      props.fields,
      (acc, item) => ((acc[item.name] = { item, ...useField(item.name) }), acc),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,
    )

    return {
      fieldProps,
    }
  },
})
</script>
