import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "./build/main.js",
  output: {
    file: "./dist/main.js",
    format: "esm", // Use CommonJS format to avoid import/export statements
    sourcemap: false,
    strict: false,
  },
  treeshake: false,
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    copy({
      targets: [{ src: "./appsscript.json", dest: "dist" }],
    }),
  ],
};
