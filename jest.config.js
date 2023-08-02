const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./path-aliases");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/src/",
    }),
  },
  setupFilesAfterEnv: ["./testSetup.ts"],
  testTimeout: 20000,
};
