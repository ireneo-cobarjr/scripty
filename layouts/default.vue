<script setup lang="ts">
const user = useUser();
const router = useRouter();

const create = () => {
  router.push("/scripty/new");
};

const goToHome = () => {
  router.push("/");
};
</script>

<template>
  <div>
    <div class="bg-primary padded navbar">
      <h2 class="title text-white">Scripty</h2>
      <div id="scripts-nav">
        <div class="mr-md" @click="create">+ Create</div>
        <div class="mr-md script-tab" @click="goToHome">My Scripty</div>
      </div>
      <div id="user-actions">
        <div>Sign out</div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    cursor: pointer;
  }

  #user-actions {
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
  }

  #scripts-nav {
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
  }

  .script-tab {
    transition: 0.09s linear;
    border-bottom: 1px solid white;
    padding-bottom: 0.3em;
    font-weight: normal;

    &:hover {
      border-bottom-width: 5px;
      font-weight: bold;
    }
  }
}
</style>
