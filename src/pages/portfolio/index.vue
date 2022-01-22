<script setup lang="ts">
const projects = [{
  path: '/portfolio/quento',
  title: 'Quento',
},
{
  path: '/portfolio/cbyearbook2021',
  title: 'CB Yearbook 2021',
}];
</script>

<template>
  <div class="prose">
    <h1 class="font-normal font-banner mb-0" style="font-weight:normal">
      Portfolio
    </h1>
  </div>

  <ul class="select-none">
    <router-link
      v-for="route in projects"
      :key="route.path"
      class="font-normal mt-2 mb-6 item block no-underline"
      :to="route.path"
    >
      <li class="opacity-75 transition-all no-underline hover:opacity-100">
        <div class="text-xl font-banner  title">
          {{ route.title }}
        </div>
      </li>
    </router-link>
  </ul>
</template>
