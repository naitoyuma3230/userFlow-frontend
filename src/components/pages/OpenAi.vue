<script setup lang="ts">
import axios from '@/plugins/axios';
import { ref } from 'vue';

type PostMessage = {
  message: string;
};

const formQuestion = ref<string>('');

const answers = ref<string[]>([]);

const postQuestion = async (question: PostMessage): Promise<any> =>
  axios.post('/openai', question);

const questionHandler = async () => {
  const postMessage = {
    message: formQuestion.value,
  };
  const postAnser = await postQuestion(postMessage);
  formQuestion.value = '';
  answers.value.push(postAnser.data.content);
};
</script>

<template>
  <v-alert
    type="info"
    max-width="400px"
    class="mb-2"
    border="bottom"
    border-color="deep-purple accent-4"
    v-for="(answer, i) in answers"
    :key="i"
    >{{ answer }}</v-alert
  >
  <v-textarea label="質問内容" v-model="formQuestion"></v-textarea>
  <v-btn color="info" @click="questionHandler()"> 質問する </v-btn>
</template>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
