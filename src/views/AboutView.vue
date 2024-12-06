<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()

    const isLoggedIn = (name: string) => authStore.currentUserName === name

    return {
      userList: ref(authStore.userList),
      isLoggedIn,
    }
  },
})
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Password</th>
        <th class="text-left">Is Login</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in userList" :key="item.id">
        <td>{{ item.userName }}</td>
        <td>{{ item.password }}</td>
        <td>
          <v-icon
            v-if="isLoggedIn(item.userName)"
            icon="mdi-checkbox-marked-circle"
            color="success"
            end
          ></v-icon>
          <v-icon v-else icon="mdi-cancel" color="error" end></v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss"></style>
