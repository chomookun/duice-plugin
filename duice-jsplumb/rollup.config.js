import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    input: "dist/index.js",
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
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};