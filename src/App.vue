<script lang="ts">
import { defineComponent, computed, ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HelloWorld from '@/components/HelloWorld.vue'
import { userFormFields } from './data/main'
import { forEach } from 'lodash'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const isDynamicForm = ref(false)

    const logout = () => authStore.logout()

    authStore.loadUser()

    const routeName = computed(() => route.name)

    const isAbout = () => routeName.value === 'about'

    const createFormUser = () => (isDynamicForm.value = !isDynamicForm.value)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createUsers = ({ items }: any) => {
      console.log({ items })
      forEach(items, (user) => authStore.createUser(user))
    }
    return {
      isAuthenticated,
      isDynamicForm,
      authStore,
      routeName,
      dynamicFormProps: { fields: userFormFields },
      logout,
      isAbout,
      createFormUser,
      createUsers,
      dynamicForm: defineAsyncComponent(() => import('@/components/DynamicFormArray.vue')),
    }
  },
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld v-if="isAuthenticated" msg="You did it!" />
      <nav v-if="isAuthenticated">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button class="btn-logout" type="button" @click="logout">Logout</button>
      </nav>
      <nav v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>

      <div class="dynamic-form">
        <transition name="fade" mode="out-in">
          <v-btn v-if="isAbout()" class="d-block" @click="createFormUser()"> Create User </v-btn>
        </transition>
        <component
          v-if="isDynamicForm"
          :is="dynamicForm"
          v-bind="dynamicFormProps"
          @submit="createUsers"
        />
      </div>
    </div>
  </header>

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.btn-logout {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.dynamic-form {
  width: 100%;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a,
  button {
    display: inline;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);

    &.router-link-exact-active:hover {
      background-color: transparent;
    }

    &.router-link-exact-active {
      color: var(--color-text);
    }
  }

  a:first-of-type {
    border: 0;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);

    .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
