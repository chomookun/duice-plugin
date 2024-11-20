import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import multiEntry from "@rollup/plugin-multi-entry";

export default {
    input: "dist/**/*.js",
    output: [
        {
            file: "dist/duice-marked.js",
            format: "iife",
            name: "duiceMarked",
            sourcemap: true,
        },
        {
            file: "dist/duice-marked.min.js",
            format: "iife",
            name: "duiceMarked",
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