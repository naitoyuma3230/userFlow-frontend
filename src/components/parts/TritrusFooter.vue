<script setup lang="ts"></script>

<template>
  <v-footer
    app
    absolute
    class="tritrus-footer flex-column justify-center"
    height="80"
  >
    <ul class="tritrus-footer__links">
      <li><a href="">会社概要</a></li>
      <li><a href="">プライバシーポリシー</a></li>
      <li><a href="">利用規約</a></li>
    </ul>

    <p>Copyright(c) Kanamic Network Co.,LTD</p>
  </v-footer>
</template>

<style scoped lang="stylus">
.tritrus-footer
  border-top: 1px solid #ccc

  &__links
    display: flex
    gap: 2rem
    list-style: none
</style>
