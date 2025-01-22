import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json";

const banner = `
/*!
 * ${pkg.name} - v${pkg.version}
 * git: https://gitbub.com/chomookun/duice-plugin
 * website: https://duice-plugin.chomookun.org
 * Released under the ${pkg.license} License
 */
`.trim();

export default {
    input: "dist/index.js",
    output: [
        {
            file: "dist/duice-pagination.js",
            format: "iife",
            name: "duicePagination",
            sourcemap: true,
            banner: banner,
        },
        {
            file: "dist/duice-pagination.min.js",
            format: "iife",
            name: "duicePagination",
            plugins: [terser()],
            sourcemap: true,
            banner: banner,
        }
    ],
    plugins: [
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};