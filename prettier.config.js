// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
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
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
