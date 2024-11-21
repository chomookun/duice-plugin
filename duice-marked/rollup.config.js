import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    input: "dist/index.js",
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
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};