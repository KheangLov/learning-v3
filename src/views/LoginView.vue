<template>
  <AuthLayout title="Login" :fields="fields" submit-text="Login" @submit="handleLogin" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { string } from 'yup'
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
    ]

    const handleLogin = (values: IUser) => authStore.login(values)

    return {
      fields,
      handleLogin,
    }
  },
})
</script>
