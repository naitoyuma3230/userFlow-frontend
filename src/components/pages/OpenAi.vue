<script setup lang="ts">
import axios from '@/plugins/axios';
import { ref, reactive } from 'vue';

type PostMessage = {
  message: string;
};

type Answer = {
  content: string;
  isLiked: boolean | null;
};

type QuestionAnswer = {
  question: {
    content: string;
  };
  answer: {
    content: string;
    isLiked: boolean | null;
  };
};

const questionAnswers = reactive<QuestionAnswer[]>([
  {
    question: {
      content: 'サポートシステムです。',
    },
    answer: {
      content: 'これはサンプルの回答です。',
      isLiked: null,
    },
  },
  {
    question: {
      content: 'これはデフォルトの質問です',
    },
    answer: {
      content: 'これはデフォルトの回答内容です。',
      isLiked: null,
    },
  },
]);

const formQuestion = ref<string>('');

const postQuestion = async (question: PostMessage): Promise<any> =>
  axios.post('/openai', JSON.stringify(question), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

const loading = ref<boolean[]>([false, false]);

const questionHandler = async () => {
  const postMessage = {
    message: formQuestion.value,
  };
  loading.value[0] = true;
  const returnAnser = await postQuestion(postMessage);
  const newQuestionAnser = {
    question: {
      content: formQuestion.value,
    },
    answer: {
      content: returnAnser.data.content,
      isLiked: null,
    },
  };
  questionAnswers.push(newQuestionAnser);
  formQuestion.value = '';
  loading.value[0] = false;
};

const postQuestionAnswer = async (
  questionAnswer: QuestionAnswer
): Promise<Answer> =>
  axios.post('/openai/qa', JSON.stringify(questionAnswer), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
const postQuestionAnswerHandler = async (bool: boolean, i: number) => {
  loading.value[i] = true;
  questionAnswers[i].answer.isLiked = bool;
  const result = await postQuestionAnswer(questionAnswers[i]);
  loading.value[i] = false;
  return result;
};
</script>

<template>
  <v-alert
    class="mb-2"
    max-width="400px"
    type="info"
    border="bottom"
    border-color="deep-purple accent-4"
    v-for="(questionAnswer, i) in questionAnswers"
    :key="i"
    >{{ questionAnswer.answer.content }}
    <div class="d-flex justify-end align-center">
      <v-btn
        v-show="
          questionAnswer.answer.isLiked || questionAnswer.answer.isLiked == null
        "
        icon="mdi-thumb-up"
        size="x-small"
        variant="outlined"
        :loading="loading[i]"
        :disabled="loading[i] || questionAnswer.answer.isLiked !== null"
        class="mx-1"
        @click="postQuestionAnswerHandler(true, i)"
      ></v-btn>
      <v-btn
        v-show="
          !questionAnswer.answer.isLiked ||
          questionAnswer.answer.isLiked == null
        "
        icon="mdi-thumb-down"
        size="x-small"
        variant="outlined"
        :loading="loading[i]"
        :disabled="loading[i] || questionAnswer.answer.isLiked !== null"
        class="mx-1"
        @click="postQuestionAnswerHandler(false, i)"
      ></v-btn>
    </div>
  </v-alert>
  <v-textarea label="質問内容" v-model="formQuestion"></v-textarea>
  <v-btn
    color="info"
    :loading="loading[0]"
    :disabled="loading[0]"
    @click="questionHandler()"
  >
    質問する
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
