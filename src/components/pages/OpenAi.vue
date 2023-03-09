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

const loading = ref<boolean[]>([false, true]);

const questionHandler = async () => {
  const postMessage = {
    message: formQuestion.value,
  };
  loading.value[0] = true
  const postAnser = await postQuestion(postMessage);
  formQuestion.value = '';
  answers.value.push(postAnser.data.content);
  loading.value[0] = false
};

</script>

<template>
  <v-alert class="mb-2" max-width="400px" type="info" border="bottom" border-color="deep-purple accent-4"
    v-for="(answer, i) in answers" :key="i">{{ answer }}
    <div class="d-flex justify-end align-center">
      <v-btn icon="mdi-thumb-up" size="small" variant="outlined" :loading="loading[1]" :disabled="loading[1]"></v-btn>
    </div>
  </v-alert>
  <v-textarea label="質問内容" v-model="formQuestion"></v-textarea>
  <v-btn color="info" :loading="loading[0]" :disabled="loading[0]" @click="questionHandler()"> 質問する
    <template v-slot:loader>
      <span class="custom-loader">
        <v-icon light>mdi-cached</v-icon>
      </span>
    </template>
  </v-btn>
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
