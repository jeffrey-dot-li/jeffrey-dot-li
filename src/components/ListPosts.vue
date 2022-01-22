<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '~/logic';

const props = defineProps<{
  type?: string
}>();

const router = useRouter();
const routes = router.getRoutes()
  .filter(i => i.path.startsWith('/thoughts') && i.meta.frontmatter && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date));

const posts = computed(() =>
  routes.filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type),
);
</script>

<template>
  <ul>
    <router-link
      v-for="route in posts"
      :key="route.path"
      class="font-normal mt-2 mb-6 item block no-underline"
      :to="route.path"
    >
      <li class="opacity-75 transition-all no-underline hover:opacity-100">
        <div class="font-banner text-xl  title">
          {{ route.meta.frontmatter.title }}
        </div>
        <div class="-mt-1 text-sm opacity-75 time">
          {{ formatDate(route.meta.frontmatter.date) }} <span v-if="route.meta.frontmatter.duration" class="opacity-50">· {{ route.meta.frontmatter.duration }}</span>
        </div>
      </li>
    </router-link>
  </ul>
</template>
