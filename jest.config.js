export default {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  verbose: true,
  testEnvironment: "jsdom", // Emula o DOM para testes React
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeia o alias para a pasta "src"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Certifique-se de que o Jest sabe lidar com JSX/TSX
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Configura jest-dom
  testMatch: ["**/src/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"], // Detecta arquivos de teste
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
}
