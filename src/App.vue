<script setup lang="ts">
import { onMounted } from "vue";
import Nav from "@/components/Nav.vue";
import LogIn from '@/components/LogIn.vue';
import QuizView from '@/views/QuizView.vue';
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(() => {
  userStore.getUser();
});
</script>
<template>
  <header>
    <Nav />
  </header>
  <main>
      <Suspense>
        <template #default>
          <LogIn v-if="!user"/>
          <QuizView v-else />
        </template>
        <template  #fallback>
          <h1>loading...</h1>
        </template>
      </Suspense>
  </main>
</template>

<style scoped>
main {
  background-color: rgb(255, 255, 255);
}
</style>