<script setup lang="ts">
import QuizCard from "../components/QuizCard.vue";
import { useQuizStore } from "@/stores/quizzes";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/users";
import { ref } from "vue";
import Results from "@/components/Results.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const quizStore = useQuizStore();
const { quizzes, difficulty } = storeToRefs(quizStore);
let numberOfCorrectAnswers = ref(0);

// Potential edge case:
// users might choose the right answer and then change it to the wrong one later
// "numberOfCorrectAnswers" should reflect that
// They might also click the same answer multiple times. which affects the results
// I'm confident that I could resolve these issues if I had more time
const onOptionSelected = (wasCorrect: number) => {
  if (wasCorrect === 1) {
    numberOfCorrectAnswers.value = numberOfCorrectAnswers.value + wasCorrect;
  } else if (wasCorrect === 0) {
    console.log("nothing");
  } else if (wasCorrect === 2) {
    console.log("minus");
    numberOfCorrectAnswers.value--;
  }
};
</script>

<template>
  <div class="quiz-header">
    <h1>TriviaQuiz</h1>
    <h4>Your selected difficulty:</h4>
    <h2>{{ difficulty }}</h2>
    <div class="cards-container">
      <Suspense>
        <template #default>
          <QuizCard
            v-if="user"
            v-for="(quiz, i) in quizzes"
            :index="i"
            :key="i"
            :quizzes="quizzes"
            :number-of-correct-answers="numberOfCorrectAnswers"
            @select-option="onOptionSelected"
          />
          <p v-else>
            We have not added any questions here yet, try another quiz!
          </p>
        </template>
        <template #fallback> Loading... </template>
      </Suspense>
    </div>
    <Results :number-of-correct-answers="numberOfCorrectAnswers" />
  </div>
</template>

<style scoped>
.quiz-header {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cards-container {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
