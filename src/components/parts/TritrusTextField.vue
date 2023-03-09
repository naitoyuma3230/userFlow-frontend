<script setup lang="ts">
import { useAttrs, ref } from 'vue';
import { useStore } from '@/store';

const store = useStore();

type ErrorRule = (value: string) => true | string;

const attrs = useAttrs();

const props = defineProps<{
  target?: OfficeCategory;
}>();

const rules: Array<ErrorRule> = [];

const keyword = ref<string>('');
// 選択キーワードを含む法人を取得したい
const searchCompanies = (inputKeyword: string) => {
  const setWord = inputKeyword || '';
  switch (props.target) {
    case 'care':
      store.dispatch('searchCarehome', setWord);
      break;

    case 'medical':
      store.dispatch('searchHospital', setWord);
      break;

    default:
      store.dispatch('searchCompanies', setWord);
      break;
  }
};

const inputHandler = () => {
  searchCompanies(keyword.value);
};

// rule: required
if ('required' in attrs) {
  const requiredError: ErrorRule = (value: string) =>
    !!value || '入力してください';
  rules.push(requiredError);
}

// rule: 文字数制限
if ('min-length' in attrs) {
  const length = Number(attrs['min-length']);
  const lengthError: ErrorRule = (value: string) =>
    (value && value.length >= length) || `${length}文字以上入力してください`;
  rules.push(lengthError);
}
</script>

<template>
  <v-text-field
    @input="inputHandler"
    v-model="keyword"
    variant="outlined"
    :rules="rules"
    hide-details="auto"
    class="text-left"
  />
</template>
