import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";

const env = process.env.NODE_ENV;

const config = {
  format: "umd",
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react/index.js": ["Component", "createElement"]
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    })
  ]
};

export default config;
