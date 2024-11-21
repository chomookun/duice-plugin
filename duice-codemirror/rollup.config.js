import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import multiEntry from "@rollup/plugin-multi-entry";

export default {
    input: "dist/**/*.js",
    output: [
        {
            file: "dist/duice-codemirror.js",
            format: "iife",
            name: "duiceCodemirror",
            sourcemap: true,
        },
        {
            file: "dist/duice-codemirror.min.js",
            format: "iife",
            name: "duiceCodemirror",
            plugins: [terser()],
            sourcemap: true,
        }
    ],
    plugins: [
        multiEntry(),
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};