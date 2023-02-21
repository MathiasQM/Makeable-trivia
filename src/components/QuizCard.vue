<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["selectOption"]);
const { index, quizzes, numberOfCorrectAnswers } = defineProps<{
    quizzes: object,
    index: number,
    numberOfCorrectAnswers: number,
}>();

let isCorrect = ref(false);
const wrongAnswers = quizzes[index].incorrect_answers;


// number included in emmit is supposed to help decide what to do with the number of correct answers in the parent
// I'm confident that this feature would have been implemented if i had more time
const emitSelectedOption = (isCorrect: boolean) => {
  if (isCorrect) {
    emit("selectOption", 1);
  } else if (!isCorrect && numberOfCorrectAnswers > 0) {
    emit("selectOption", 2);
  } else if (!isCorrect && numberOfCorrectAnswers === 0) {
    emit("selectOption", 0);
  }
};
</script>

<template>
  <div class="card-wrapper">
    <h2>{{ quizzes[index].question }}</h2>
    <form>
      <div @click="isCorrect = true">
        <input
          type="radio"
          name="question"
          :id="quizzes[index].correct_answer"
        />
        <label :for="quizzes[index].correct_answer">{{
          quizzes[index].correct_answer
        }}</label>
      </div>
      <div>
        <div
          @click="isCorrect = false"
          v-for="(wrongAnswer, i) in wrongAnswers"
        >
          <input type="radio" name="question" :id="wrongAnswer" />
          <label :for="wrongAnswer">{{quizzes[index].incorrect_answers[i]}}</label>
        </div>
        <AButton @click="emitSelectedOption(isCorrect)" type="primary">Submit answer</AButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card-wrapper {
  width: 310px;
  height: 250px;
  overflow: hidden;
  border-radius: 2%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
  margin-right: 20px;
  cursor: pointer;
  padding: 10px;
}

h2 {
  font-size: 15px;
  font-weight: bold;
}

label {
  color: black;
  margin-left: 10px;
}
</style>
