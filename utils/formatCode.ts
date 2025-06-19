import prettier from "prettier/standalone";
import * as babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

export function formatCode(code: string): Promise<string> | undefined {
  try {
    return prettier.format(code, {
      parser: "babel",
      plugins: [babelPlugin, estreePlugin],
    });
  } catch (err) {
    console.error("Prettier formatting error:", err);
  }
}
