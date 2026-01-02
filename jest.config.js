import { createDefaultPreset } from "ts-jest";

/** @type {import("jest").Config} */
const tsJestTransformCfg = createDefaultPreset().transform;

const config = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default config;
