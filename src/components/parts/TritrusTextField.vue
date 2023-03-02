<script setup lang="ts">
import { useAttrs } from 'vue';

type ErrorRule = (value: string) => true | string;

const attrs = useAttrs();

const rules: Array<ErrorRule> = [];

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
    variant="outlined"
    :rules="rules"
    hide-details="auto"
    class="text-left"
  />
</template>
