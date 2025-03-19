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
            name: "duice.plugin.Marked",
            sourcemap: true,
            banner: banner,
            globals: {
                duice: 'duice'
            }
        },
        {
            file: "dist/duice-marked.min.js",
            format: "iife",
            name: "duice.plugin.Marked",
            plugins: [terser()],
            sourcemap: true,
            banner: banner,
            globals: {
                duice: 'duice'
            }
        }
    ],
    external: ['duice'],
    plugins: [
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};