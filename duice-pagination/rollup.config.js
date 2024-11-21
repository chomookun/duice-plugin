import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    input: "dist/index.js",
    output: [
        {
            file: "dist/duice-pagination.js",
            format: "iife",
            name: "duicePagination",
            sourcemap: true,
        },
        {
            file: "dist/duice-pagination.min.js",
            format: "iife",
            name: "duicePagination",
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