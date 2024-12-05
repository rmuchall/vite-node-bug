import eslintJs from "@eslint/js";
import typeScriptEslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default typeScriptEslint.config(
  eslintJs.configs.recommended,
  ...typeScriptEslint.configs.strictTypeChecked,
  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      // Enable @stylistic
      "@stylistic/quotes": ["error", "double", {"allowTemplateLiterals": true}],
      "@stylistic/semi": ["error", "always"],
      // Enable eslint
      "require-await": "error",
      "no-return-await": "error",
    }
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": typeScriptEslint.plugin
    },
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser", // Not sure why this is required, maybe for eslint 8.xx compatibility
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
    },
    rules: {
      // Enable @typescript-eslint
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/unbound-method": ["error", {"ignoreStatic": true}],
      // Disable @typescript-eslint recommended
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // Disable @typescript-eslint strict
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-confusing-void-expression": ["error", {ignoreArrowShorthand: true}],
      // Disable @typescript-eslint unsafe
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off"
    }
  },
  // Do not use type aware checks on *.js, *.cjs, *.mjs files
  // https://typescript-eslint.io/getting-started/typed-linting/#how-can-i-disable-type-aware-linting-for-a-subset-of-files
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    ...typeScriptEslint.configs.disableTypeChecked
  },
  // Ignores must be in an object by itself
  {
    ignores: [
      "dist/**",
      "vite.config.ts"
    ]
  },
);
