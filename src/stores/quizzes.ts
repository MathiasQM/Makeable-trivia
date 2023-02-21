import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useQuizStore = defineStore("quizzes", () => {

  type QuizResponse = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string;
  };

  let quizzes = ref<QuizResponse>();
  let difficulty = ref("easy");
  const loading = ref<boolean>(false);

  const setDifficulty = (currentDifficulty: string) => {
    loading.value = true;
    difficulty.value = currentDifficulty;
    getQuizData();
    loading.value = false
  };

  const getQuizData = async () => {
    loading.value = true;
    const response = await axios
    .get(
        `https://opentdb.com/api.php?amount=6&category=9&difficulty=${difficulty.value}&type=multiple`
        )
        .then((response) => {
            quizzes.value = response.data.results;
        });

        loading.value = false;
  };

  onMounted(async () => {
    getQuizData();
  });


  return {
    quizzes,
    loading,
    difficulty,
    setDifficulty,
  };
});
