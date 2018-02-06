import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

const config = {
  output: {
    format: process.env.BABEL_ENV
  },
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      include: "node_modules/**"
    })
  ],
  external: ["react", "react-dom", "prop-types", "styled-components"]
};

export default config;
