const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const path = require("path");

// Get the absolute path to the package directory
const packageDir = __dirname;

module.exports = [
  // Main library bundle
  {
    input: path.resolve(packageDir, "src/index.ts"),
    output: {
      file: path.resolve(packageDir, "dist/index.esm.js"),
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: path.resolve(packageDir, "tsconfig.lib.json"),
      }),
    ],
    external: [], // Add any external dependencies here
  },
  // CLI bundle
  {
    input: path.resolve(packageDir, "src/cli/generate.ts"),
    output: {
      file: path.resolve(packageDir, "dist/cli/generate.js"),
      format: "esm",
      sourcemap: true,
      banner: "#!/usr/bin/env node",
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: path.resolve(packageDir, "tsconfig.lib.json"),
      }),
    ],
    external: ["fs", "path", "url"], // Node.js built-ins
  },
  // CLI index
  {
    input: path.resolve(packageDir, "src/cli/index.ts"),
    output: {
      file: path.resolve(packageDir, "dist/cli/index.js"),
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: path.resolve(packageDir, "tsconfig.lib.json"),
      }),
    ],
    external: ["./generate.js"],
  },
];
