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
            file: "dist/duice-marked.js",
            format: "iife",
            name: "duiceMarked",
            sourcemap: true,
            banner: banner,
        },
        {
            file: "dist/duice-marked.min.js",
            format: "iife",
            name: "duiceMarked",
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