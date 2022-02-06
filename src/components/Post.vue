<script setup lang='ts'>
import { useEventListener } from '@vueuse/core';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '~/logic';
defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
});
const router = useRouter();
const content = ref<HTMLDivElement>();
onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a');
    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      const { pathname, hash } = url;
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash);
        navigate();
      }
      else {
        router.push({ path: pathname, hash });
      }
    }
  };
  useEventListener(window, 'hashchange', navigate);
  useEventListener(content.value!, 'click', handleAnchors, { passive: false });
  navigate();
  setTimeout(navigate, 500);
});
</script>

<template>
  <div v-if="frontmatter.display ?? frontmatter.title" class="m-auto mb-8 prose">
    <h1 class="font-banner mb-0">
      {{ frontmatter.display ?? frontmatter.title }}
    </h1>
    <p v-if="frontmatter.date" class="opacity-50 !-mt-2">
      {{ formatDate(frontmatter.date) }}
      <span
        v-if="frontmatter.duration"
      >· {{ frontmatter.duration }}</span>
    </p>
    <p v-if="frontmatter.subtitle" class="opacity-50 italic !-mt-6">
      {{ frontmatter.subtitle }}
    </p>
  </div>

  <article ref="content" class="font-content text-left indent article-content" :class="frontmatter.format">
    <slot />
  </article>
</template>

<style lang="scss">
.article-content {
  > * p:nth-child(2)::first-letter {
    // Second child because the first child is table of contents for some reason.
    @apply font-bold;
    font-size: 5rem;
    line-height: 1;
  }
}
.verse
{
  div {
    @apply prose-verse;
  }
}
</style>
