import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import path from "path";

const pkg = require("./package.json");

export default {
    input : "./src/index.js",

    plugins : [
        resolve({
            browser : false,
        }),
        commonjs(),
        terser(),
        alias({
            entries : [
                { find : "src", replacement : path.resolve(__dirname, "./src") },
            ],
        }),
    ],

    output : [
        {
            file   : pkg.module,
            format : "es",
        },
        {
            file   : pkg.main,
            format : "cjs",
            name   : pkg.nam,
        },
    ],
};
