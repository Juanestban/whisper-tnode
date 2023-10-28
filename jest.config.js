const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('jest').Config} */
module.exports = {
  verbose: true,
  globals: {
    __DEV__: true,
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  injectGlobals: true,
  transform: {
    ...tsjPreset.transform,
    '^.+\\.ts?$': [
      '@swc-node/jest',
      {
        dynamicImport: true,
        react: {
          pragma: 'h',
        },
      },
    ],
  },
  detectOpenHandles: true,
  testPathIgnorePatterns: ['./dist/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', './lib/whisper.cpp/'],
};
