<script setup lang="ts">
import { reactive } from "vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { errorMessage, loading } = storeToRefs(userStore);

interface userCredentials {
  email: string;
  password: string;
}

const userCredentials = reactive<userCredentials>({
  email: "",
  password: "",
});

const logIn = async () => {
  userStore.handleLogin({
    email: userCredentials.email,
    password: userCredentials.password,
  });
  userStore.clearErrorMessage();
  userCredentials.email = "";
  userCredentials.password = "";
};
</script>

<template>
  <AForm class="login-form" :model="userCredentials" name="basic">
    <p>Email: makeable@email.com Password: makeable</p>
    <div v-if="!loading" class="input-container">
      <AInput v-model:value="userCredentials.email" placeholder="Email" />
      <AInputPassword
        v-model:value="userCredentials.password"
        placeholder="Password"
      />
    </div>
    <div class="spinner" v-else>
      <ASpin />
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <AButton :disabled="loading" type="primary" @click="logIn">Log in</AButton>
  </AForm>
</template>

<style scoped>
.login-form {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
