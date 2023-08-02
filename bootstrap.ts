/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from "dotenv";
dotenv.config();

const { compilerOptions } = require("./path-aliases.json");
const tsConfigPaths = require("tsconfig-paths");

const baseUrl = __dirname + "/src"; // Either absolute or relative path. If relative it's resolved to current working directory.
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: compilerOptions.paths,
});
