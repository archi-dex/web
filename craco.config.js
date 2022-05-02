const path = require("path");

module.exports = {
  webpack: {
    alias: { "~": path.resolve(__dirname, "./src") },
  },
  jest: {
    configure: {
      testTimeout: 20000,
      roots: ["<rootDir>/src", "<rootDir>/test"],
      testMatch: ["<rootDir>/test/**/*.test.{tsx,ts}"],
      moduleNameMapper: { "^~/(.+)": "<rootDir>/src/$1" },
    },
  },
};
