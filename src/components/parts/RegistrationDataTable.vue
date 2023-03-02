<script setup lang="ts">
const props = defineProps<{
  registrationData: { [key: string]: string };
}>();
</script>

<template>
  <table class="registration-data-table">
    <tbody>
      <tr v-for="(value, key) in registrationData" :key="key">
        <th class="registration-data-table__header">{{ key }}</th>
        <td class="registration-data-table__body">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="stylus">
.registration-data-table
  width: 100%
  border-collapse: collapse

  &__header
  &__body
    padding: 11px 10px
    border: 1px solid #ccc

  &__header
    width: 13rem
    background-color: #ffefd6
</style>
