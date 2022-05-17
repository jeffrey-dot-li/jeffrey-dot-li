<script setup lang="ts">
const photos = [
  {
    src : 'https://m.media-amazon.com/images/I/61+6ga32DbL._SL1425_.jpg',
    alt : 'Swimming by Mac Miller'
  },
  {
    src : 'photos/birthday.jpg',
    alt: 'Birthday with friends'
  },
  {
    src : 'photos/western.jpg',
    alt : 'Me at western',
  },
  {
    src : 'photos/robotics.jpg',
    alt: 'Robotics Team'
  }
] as const;

const shuffled = [...photos].sort(() => 0.5 - Math.random());

</script>

<template>
  <svg
    class="h-full w-full opacity-75 inset-0 absolute overflow-visible"
    viewBox="0 0 1152 700"
    preserveAspectRatio="xMidYMid slice"
    style="z-index: -1"
  >
    <path d="M1155 -1V697H214.5L1155 -1Z" fill="hsl(144,85%,50%)" />
    <path d="M1155 -1V697H813.5L1155 -1Z" fill="hsl(182,85%, 50%)" />
  </svg>
  <!-- TODO: Put the background in another file lmao and prob lavalamp it -->
  <div class="text-left p-4 md:p-12 md:w-2/3">
    <h1 class="font-title my-6 text-6xl">
      Hi, I'm Jeffrey Li.
    </h1>
    <p class="text-content ml-6 text-2xl text-gray-600 md:w-[90%] dark:text-gray-300">
      Welcome to my little corner of the internet. I try to add a splash of
      <b class="text-bloom-100 bold">color</b> wherever I can.
    </p>
    <br />
    <span class="font-content text-3xl">
      > Feel free to make yourself at
      <carbon-home class="transition-all inline hover:text-bloom-100"></carbon-home>
    </span>
  </div>
  <div class="flex flex-col justify-around items-center md:flex-row">
    <polariod :photo-url="shuffled[0].src" :alt="shuffled[0].alt" dynamic></polariod>
    <polariod :photo-url="shuffled[1].src" :alt="shuffled[1].alt" dynamic></polariod>
    <polariod :photo-url="shuffled[2].src" :alt="shuffled[2].alt" dynamic></polariod>
  </div>

  <flicker></flicker>
</template>
