// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "nuxt-codemirror", "nuxt-rating"],
  css: ["modern-normalize", "~/assets/styles/main.scss"],
  runtimeConfig: {
    groqApiKey: process.env.GROQ_API_KEY,
    groqEndPoint: process.env.GROQ_ENDPOINT || "https://api.groq.com/openai/v1",
  },
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
