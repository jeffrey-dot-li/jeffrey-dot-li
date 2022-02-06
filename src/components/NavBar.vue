<script setup lang="ts">
</script>
<template>
  <header class="header">
    <router-link
      class="outline-none h-10 m-6 w-10 absolute select-none lg:fixed"
      to="/"
      focusable="false"
    >
      <img src="/logo.svg" alt="logo">
    </router-link>
    <nav class="font-banner nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/portfolio">
          <span class="<md:hidden">Portfolio</span>
          <feather-briefcase class="md:hidden" />
        </router-link>
        <router-link to="/writing">
          <span class="<md:hidden">Writing</span>
          <feather-edit-3 class="md:hidden" />
        </router-link>

        <!--
        <router-link to="/talks" class="<md:hidden">
          Talks
        </router-link>
        <router-link to="/projects">
          <span class="<md:hidden">Projects</span>
          <ri-lightbulb-line class="md:hidden" />
        </router-link>
        <router-link to="/bookmarks" title="Bookmarks" class="<md:hidden">
          <ri-bookmark-line />
        </router-link>
        <router-link to="/notes" title="Notes">
          <ri-sticky-note-line />
        </router-link> -->
        <!-- <a href="https://twitter.com/antfu7" target="_blank" title="Twitter">
          <feather-twitter />
        </a>
        <a href="https://twitter.com/antfu7" target="_blank" title="Twitter">
          <feather-twitter />
        </a> -->
        <a href="https://github.com/jeffrey-dot-li" target="_blank" title="GitHub">
          <uil-github-alt />
        </a>
        <!-- <a href="/feed.xml" target="_blank" title="RSS" class="<md:hidden">
          <la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a> -->
        <!-- <toggle-theme /> -->
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}
.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}
.nav {
  /* @ */
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}
.nav > * {
  margin: auto;
}
.nav img {
  margin-bottom: 0;
}
.nav a {
  @apply text-xl;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: 0.2s ease;
  opacity: 0.6;
  outline: none;
}
.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
  /* windicss ignore */
  /* bruh */
  @apply text-bloom-65;
}
.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}
.nav .right > * {
  margin: auto;
}
</style>
