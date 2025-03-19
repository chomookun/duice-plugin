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
            file: "dist/duice-codemirror.js",
            format: "iife",
            name: "duice.plugin.Codemirror",
            sourcemap: true,
            banner: banner,
            globals: {
                duice: 'duice'
            }
        },
        {
            file: "dist/duice-codemirror.min.js",
            format: "iife",
            name: "duice.plugin.Codemirror",
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