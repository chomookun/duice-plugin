import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    input: "dist/index.js",
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
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};