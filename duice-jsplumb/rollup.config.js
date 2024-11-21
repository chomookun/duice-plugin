import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import multiEntry from "@rollup/plugin-multi-entry";

export default {
    input: "dist/**/*.js",
    output: [
        {
            file: "dist/duice-jsplumb.js",
            format: "iife",
            name: "duiceJsplumb",
            sourcemap: true,
        },
        {
            file: "dist/duice-jsplumb.min.js",
            format: "iife",
            name: "duiceJsplumb",
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