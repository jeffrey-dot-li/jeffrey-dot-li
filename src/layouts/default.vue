<template>
  <NavBar />
  <main
    class="flex flex-col flex-1 text-center px-4 text-gray-700 relative dark:text-gray-200"
  >
    <div class="flex flex-col flex-1">
      <router-view />
    </div>
    <Footer class="self-end" />
  </main>
</template>
