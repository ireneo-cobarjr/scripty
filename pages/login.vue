<script setup lang="ts">
interface Credential {
  username: string;
  password: string;
}

const credential = ref<Credential>({
  username: "",
  password: "",
});

const user = useUser();
const router = useRouter();

const signIn = async () => {
  const response: { user: User } = await $fetch("/api/login", {
    method: "POST",
    body: { ...credential.value },
  });

  if (response.user) {
    user.value = response.user;
    router.push("/");
  }
};
</script>

<template>
  <div class="shadow">
    <div class="mb-lg padded bg-primary">
      <h2 class="title text-white">Scripty</h2>
      <div class="text-white mt-md">
        Let's get you signed in and start scripting.
      </div>
    </div>
    <div class="padded">
      <form @submit.prevent="signIn">
        <div class="form-field mb-md">
          <label for="username">Username</label>
          <input
            v-model="credential.username"
            id="username"
            name="username"
            class="input"
            type="text"
          />
        </div>

        <div class="form-field mb-md">
          <label for="password">Password</label>
          <input
            v-model="credential.password"
            id="password"
            name="password"
            class="input"
            type="password"
          />
        </div>

        <button type="submit" class="button button-wide primary mt-md">
          SIGN IN
        </button>
      </form>
    </div>
  </div>
</template>
