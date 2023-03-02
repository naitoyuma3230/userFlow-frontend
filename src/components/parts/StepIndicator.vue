<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();

const completionSteps = ref<Step>(store.getters.getStep);

const stepItems = computed(() => [
  {
    title: '法人の登録',
    icon: 'icon-corporation',
    completion: completionSteps.value.company,
  },
  {
    title: '所属機関の登録',
    icon: 'icon-profile',
    completion: completionSteps.value.office,
  },
  {
    title: '申請者様情報の登録',
    icon: 'icon-profile',
    completion: completionSteps.value.user,
  },
  {
    title: '入力内容確認',
    icon: 'icon-flag',
    completion: completionSteps.value.check,
  },
]);
</script>

<template>
  <div class="step-indicator">
    <div
      v-for="step in stepItems"
      :key="step.title"
      class="step-item"
      :class="{ completion: step.completion }"
    >
      <span class="step-item__icon elevation-5" :class="step.icon" />
      <p class="step-item__text">{{ step.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="stylus">
$white = #fff
$orange = #fc8f2f
$gray = #efefef

.step-indicator
  display: inline-grid
  // stylelint-disable-next-line plugin/no-unsupported-browser-features
  grid-template-columns: repeat(4, 1fr)
  width: 100%

.step-item
  position: relative
  display: flex
  flex-direction: column
  align-items: center

  &__icon
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
    width: 3rem
    height: @width
    font-size: 20px
    line-height: 1
    color: $orange
    background-color: $white
    border-radius: 50%

    .completion &
      color: $white
      background-color: $orange

  &__text
    height: 3rem
    padding-top: 1rem
    font-size: 0.7rem

  &:not(:first-child)::after
    position: absolute
    top: calc(50% - 1.5rem)
    right: 50%
    z-index: 0
    width: 100%
    height: 1rem
    content: ''
    background-color: $gray
    transform: translateY(-50%)

    .completion&
      background-color: $orange
</style>
