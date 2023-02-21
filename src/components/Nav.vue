<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { useQuizStore } from "@/stores/quizzes";
import Container from "./Container.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const quizStore = useQuizStore();

const currentDifficulty = ref("");

const changeDifficulty = (e: string) => {
  currentDifficulty.value = e;
  quizStore.setDifficulty(currentDifficulty.value);
};
</script>
<template>
  <ALayoutHeader>
    <Container>
      <div class="nav-container">
        <div class="left-content">
          <RouterLink class="link" to="/">TriviaQuiz</RouterLink>
        </div>
        <div v-show="user" class="center-content">
          <RouterLink @click="changeDifficulty('easy')" to="/">Easy</RouterLink>
          <RouterLink @click="changeDifficulty('medium')" to="/">Medium</RouterLink>
          <RouterLink @click="changeDifficulty('hard')" to="/">Hard</RouterLink>
        </div>
        <div class="right-content">
          <AButton v-show="user" type="primary" @click="userStore.handleLogout">Sign out</AButton>
        </div>
      </div>
    </Container>
  </ALayoutHeader>
</template>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
}
.center-content {
  width: 200px;
  display: flex;
  justify-content: space-around;
}

.left-content {
  display: flex;
  align-items: center;
}

.left-content a {
  margin-right: 10px;
}

@media only screen and (max-width: 400px) {
  .link {
    display: none;
  }
}
</style>
