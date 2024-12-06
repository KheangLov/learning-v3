<template>
  <v-row no-gutters>
    <template v-for="(item, idx) in fields" :key="idx">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="cField.value[item.name]"
          :label="item.label"
          :type="item.type"
          :error-messages="getErr(item.name)"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { type IAuthForm } from '@/types/main'

export default defineComponent({
  props: {
    fields: {
      type: Array<IAuthForm>,
      required: true,
    },
    field: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
    errors: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const getErr = (name: string) => props.errors[`items[${props.index}].${name}`]
    return {
      cField: computed(() => props.field),
      getErr,
    }
  },
})
</script>
