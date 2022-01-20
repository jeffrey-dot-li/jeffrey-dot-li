<script setup lang="ts">
import { useHead } from '@vueuse/head';

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Jeffrey Li',
  meta: [
    { property: 'og:title', content: 'Jeffrey Li' },
    // { property: 'og:image', content: 'https://antfu.me/avatar.png' },
    { name: 'description', content: 'Jeffrey Li\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@jeffrey_dot_li' },
  ],
});
</script>

<template>
  <div class="flex flex-col min-h-[100vh]">
    <router-view />
  </div>
</template>
