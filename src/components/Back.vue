<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div v-if="route.path !== '/'" class="m-auto mt-8 prose ">
    <router-link
      :to="route.path.split('/').slice(0, -1).join('/') || '/'"
      class="font-mono opacity-75 no-underline hover:opacity-100"
    >
      cd ..
    </router-link>
  </div>
</template>
