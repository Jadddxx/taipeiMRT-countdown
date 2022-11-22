<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/Locker">Locker</RouterLink>
    </nav>
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
