<script setup lang="ts">
import TritrusHeader from '@/components/parts/TritrusHeader.vue';
import TritrusFooter from '@/components/parts/TritrusFooter.vue';
import StepIndicator from '@/components/parts/StepIndicator.vue';
</script>

<template>
  <v-app>
    <TritrusHeader />

    <v-main class="mx-auto mb-15">
      <StepIndicator v-if="$route.path !== '/complete'" />
      <router-view />
    </v-main>

    <TritrusFooter />
  </v-app>
</template>
