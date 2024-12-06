<template>
  <AuthLayout title="Register" :fields="fields" submit-text="Register" @submit="handleRegister" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { string, ref } from 'yup'
import { useAuthStore, type IUser } from '@/stores/auth'
import AuthLayout from '@/components/AuthLayout.vue'

export default defineComponent({
  components: {
    AuthLayout,
  },
  setup() {
    const authStore = useAuthStore()

    const fields = [
      {
        name: 'userName',
        label: 'Username',
        type: 'text',
        validation: string()
          .required('Username is required')
          .min(5, 'Password must at least 5 characters long'),
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        validation: string()
          .required('Password is required')
          .min(8, 'Password must at least 8 characters long'),
      },
      {
        name: 'passwordConfirm',
        label: 'Confirm Password',
        type: 'password',
        validation: string()
          .required('Password confirmation is required')
          .oneOf([ref('password')], 'Passwords must match')
          .min(8, 'Password confirmation must at least 8 characters long'),
      },
    ]

    const handleRegister = (values: IUser) => authStore.createUser(values)

    return {
      fields,
      handleRegister,
    }
  },
})
</script>
