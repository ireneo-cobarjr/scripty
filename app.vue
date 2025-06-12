<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { autocompletion } from '@codemirror/autocomplete';

// themes
// https://www.npmjs.com/package/@uiw/codemirror-themes-all
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { oneDark } from '@codemirror/theme-one-dark';
import { solarizedLight, solarizedDark } from '@uiw/codemirror-theme-solarized';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

const code = ref('console.log(123)\;');

const themes = reactive({
  'Github Dark': githubDark,
  'Github Light': githubLight,
  'One Dark': oneDark,
  'Solarized Dark': solarizedDark,
  'Solarized Light': solarizedLight,
  'Tokyo Night': tokyoNight
});

const startTheme = ref('Tokyo Night');
const selectedTheme = () => {
  if (startTheme.value === 'Tokyo Night') return tokyoNight;
  if (startTheme.value === 'Solarized Dark') return solarizedDark;
  if (startTheme.value === 'Solarized Light') return solarizedLight;
  if (startTheme.value === 'One Dark') return oneDark;
};

const editor = ref(null);

const extensions = [
  javascript(),
  keymap.of(defaultKeymap),
  autocompletion()
]

watch(startTheme, (v) => {

});
</script>

<template>
  <clientOnly>
    <NuxtCodeMirror
      ref="editor"
      :key="startTheme"
      v-model="code"
      height="300px"
      placeholder="type something here."
      :extensions="extensions"
      :editable="true"
      :theme="selectedTheme()"
    />
    <select v-model="startTheme">
      <option
        v-for="theme in Object.keys(themes)"
        :key="theme"
      >
        {{ theme }}
      </option>
    </select>
  </clientOnly>
</template>
