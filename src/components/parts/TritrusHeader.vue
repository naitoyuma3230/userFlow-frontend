<script setup lang="ts"></script>

<template>
  <v-app-bar
    class="pa-4 d-flex justify-space-between tritrus-header"
    style="position: sticky"
  >
    <a href="/" class="header-logo">
      <img
        alt="tritrusロゴ"
        src="src/assets/tritrus.png"
        class="header-logo__image"
      />
    </a>
  </v-app-bar>
</template>

<stype scoped lang="stylus">
.header-logo
  &__image
    vertical-align: top /* 画像下の隙間消し */
</stype>
