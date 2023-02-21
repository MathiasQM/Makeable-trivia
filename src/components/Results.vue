<script setup lang="ts">
import { ref, defineProps } from "vue";

const { numberOfCorrectAnswers } = defineProps(["numberOfCorrectAnswers"]);
const showModal = ref(false);
</script>

<template>
  <div class="results-container">
    <AButton @click="showModal = !showModal" type="primary">Check your answers</AButton>
    <div v-if="showModal" class="results">
      <p>Your Results...</p>
      <h1>
        {{ `${numberOfCorrectAnswers}` + "/6" }}
      </h1>
    </div>
  </div>
</template>

<style scoped>
.results-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
}
.results {
  width: 400px;
  background-color: white;
  border: 2px solid rgb(0, 119, 255);
  text-align: center;
  padding: 100px 0;
}

p {
  color: black;
  font-size: 25px;
}

h1 {
  font-size: 80px;
}
</style>
