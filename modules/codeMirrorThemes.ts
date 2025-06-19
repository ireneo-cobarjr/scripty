import { defineNuxtModule, addImports, addTemplate } from "@nuxt/kit";
import { toTitleCase } from "~/utils/stringCasing";
import * as themes from "@uiw/codemirror-themes-all";

export default defineNuxtModule({
  setup(options, nuxt) {
    const codeMirrorThemes = Object.keys(themes)
      .sort()
      .filter(
        (key) =>
          !(
            key.endsWith("Init") ||
            key.endsWith("Style") ||
            key.startsWith("default")
          )
      )
      .map((key) => ({
        key,
        name: toTitleCase(key),
      }));

    const { filename } = addTemplate({
      filename: "useCodeMirrorThemes.mjs",
      getContents: () =>
        `import * as themes from "@uiw/codemirror-themes-all";
        export const useCodeMirrorThemes = () => ({
          names: ${JSON.stringify(codeMirrorThemes)},
        })`,
    });

    addImports({
      name: "useCodeMirrorThemes", // name of the composable to be used
      as: "useCodeMirrorThemes",
      from: `#build/${filename}`, // path of composable
    });
  },
});
