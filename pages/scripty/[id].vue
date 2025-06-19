<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { autocompletion } from "@codemirror/autocomplete";
import { lineNumbers } from "@codemirror/view";
import { foldGutter, foldKeymap } from "@codemirror/language";

// themes
// https://www.npmjs.com/package/@uiw/codemirror-themes-all
import * as themes from "@uiw/codemirror-themes-all";
import type { Extension } from "@codemirror/state";

interface PerformanceEval {
  rating: number;
  eval: string;
  space: string;
  time: string;
}

interface Evaluation {
  correctness: string;
  performance: PerformanceEval | null;
}

const { names: themeNames } = useCodeMirrorThemes();
const user = useUser();

const code = ref("");
const description = ref("");

const evaluation = ref<Evaluation | null>(null);

const startTheme = ref("tokyoNight");

const editor = ref(null);

const title = ref("Add a title here");

const route = useRoute();

const extensions = [
  lineNumbers(),
  foldGutter(),
  javascript(),
  keymap.of([...defaultKeymap, ...foldKeymap]),
  autocompletion(),
];

const evaluate = async () => {
  const res: { result: any } = await $fetch("/api/evaluate", {
    method: "POST",
    body: {
      code: code.value,
      description: description.value,
    },
  });

  if (res.result) {
    evaluation.value = res.result;
  }
};

const format = async () => {
  const formatted = await formatCode(code.value);
  if (formatted) code.value = formatted;
};

const save = async () => {
  await $fetch("/api/scripty", {
    method: "POST",
    body: {
      userId: user.value?.id,
      code: code.value,
      description: description.value,
      evaluation: evaluation.value,
      title: title.value,
      id: route.params.id,
    },
  });
};

onMounted(async () => {
  if (route.params.id !== "new") {
    const data = await $fetch(`/api/scripty/one/${route.params.id}`);

    if (data) {
      description.value = data.description;
      title.value = data.title;
      code.value = data.code;
      evaluation.value = data.evaluation;
      console.log(data);
    }
  }
});
</script>

<template>
  <div class="centered mt-md">
    <clientOnly>
      <div class="editor-container shadow">
        <div>
          <div class="bg-primary padded">
            <input
              v-model="title"
              class="input inline wide bold heading"
              placeholder="Untitled scripty"
              type="text"
            />
          </div>
        </div>
        <div class="padded">
          <textarea
            v-model="description"
            class="textarea noresize inline"
            placeholder="Explain here what your code is for so the AI can evaluate if your code does what it suppose to."
            rows="5"
            name=""
            id=""
          ></textarea>
        </div>
        <NuxtCodeMirror
          ref="editor"
          :key="startTheme"
          v-model="code"
          height="300px"
          placeholder="Start writing your code here..."
          :extensions="extensions"
          :editable="true"
          :theme="(themes as unknown as Record<string, Extension>)[startTheme]"
        />
        <div id="editor-controls">
          <div class="editor-controls-sections">
            <v-select
              v-model="startTheme"
              :options="themeNames"
              :reduce="(theme: any) => theme.key"
              label="name"
              :clearable="false"
              style="width: 180px"
            />

            <button class="button primary" @click="format">Format Code</button>
          </div>
          <div class="editor-controls-sections">
            <button class="button primary" @click="evaluate">Evaluate</button>
            <button class="button secondary" @click="save">Save</button>
          </div>
        </div>
        <hr />
        <div class="padded">
          <div v-if="evaluation">
            <div class="eval-summary">
              <div>
                <NuxtRating
                  :read-only="true"
                  inline
                  :rating-value="evaluation.performance?.rating"
                />
                <span class="ml-md">{{
                  `${evaluation.performance?.rating} / 5`
                }}</span>
              </div>
              <span>{{
                `Time complexity is ${evaluation.performance?.time}`
              }}</span>
              <span>{{
                `Space complexity is ${evaluation.performance?.space}`
              }}</span>
            </div>
            <div class="mt-md">
              <p>{{ `"${evaluation.correctness}"` }}</p>
              <p>{{ `"${evaluation.performance?.eval}"` }}</p>
            </div>
          </div>
          <span v-else>Not yet evaluated.</span>
        </div>
      </div>
    </clientOnly>
  </div>
</template>

<style scoped lang="scss">
.cm-foldGutter {
  width: 12px;
}

.editor-container {
  width: 89vw;
  height: fit-content;
  --vs-dropdown-option--active-bg: #5424c2;
  --vs-dropdown-option--active-color: #fff;
  --vs-border-color: #5424c2;
  --vs-dropdown-max-height: 233px;
  --vs-border-radius: 0px;
}

#editor-controls {
  display: flex;
  justify-content: space-between;
  padding: 1em;
}

.editor-controls-sections {
  display: flex;
  & > * {
    margin-right: 0.4em;
    width: 112px;
  }
}

.centered {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 89vh;
}

.eval-summary {
  display: flex;
  & > * {
    margin-right: 2em;
  }
}
</style>
