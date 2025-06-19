<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const user = useUser();
const { data } = useAsyncData("user-scripties", async () => {
  const res = await $fetch(`/api/scripty/${user.value?.id}`);
  return res;
});
</script>

<template>
  <div class="cards-container padded mt-md">
    <Scripty v-for="(s, index) in data" :scripty="s" />
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  display: flex;
  & > * {
    margin: 0 1.8em 1.8em 0;
  }
}
</style>
