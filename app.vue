<script setup lang="ts">
const route = useRoute();

const layout = computed(() => {
  if (route.path.startsWith("/login")) return "centered";
  else return "default";
});
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
