import js from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"

export default [
  eslintPluginPrettierRecommended,
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          tabWidth: 2,
          semi: false,
          singleQuote: false,
          printWidth: 80,
          useTabs: false,
          jsxSingleQuote: false,
          bracketSpacing: true,
          bracketSameLine: false,
          jsxBracketSameLine: false,
          endOfLine: "auto",
          embeddedLanguageFormatting: "auto",
          singleAttributePerLine: false,
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    // Arquivos onde a regra será desativada
    files: ["src/ui/components/ui/**/*.jsx"],
    rules: {
      "prettier/prettier": "off",
    },
  },
]
