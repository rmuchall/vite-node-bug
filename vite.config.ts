import {defineConfig} from "vite";
import path from "path";
import {externalizeDeps} from "vite-plugin-externalize-deps";
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    alias: {
      // Empty
    },
  },
  plugins: [
    externalizeDeps(),
    viteStaticCopy({
      targets: [
        {
          src: "./package*.*",
          dest: "."
        }
      ]
    })
  ],
  build: {
    target: "esnext",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(process.cwd(), "src/main.ts"),
      name: "query-ai",
      // the proper extensions will be added
      fileName: "query-ai",
      formats: [
        "es"
      ]
    }
  }
});
