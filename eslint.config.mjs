import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/**",
      "dist_js/**",
      "docs/**",
      "src/http_api.d.ts",
      "src/proto/**",
      "src/protobuf/protobuf.js",
      "src/protobuf/current.js",
      "src/protobuf/current.d.ts",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-useless-assignment": "off",
    },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/current*.ts"],
  })),
  {
    files: ["src/current*.ts"],
    rules: {
      // The generated schema resolver is dynamic; wire validation uses its
      // generated metadata, not unchecked assumptions about payload fields.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  prettier,
];
