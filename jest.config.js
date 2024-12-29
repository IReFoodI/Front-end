export default {
  testEnvironment: "jsdom", // Emula o DOM para testes React
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeia o alias para a pasta "src"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Certifique-se de que o Jest sabe lidar com JSX/TSX
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.js"], // Configura jest-dom
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"], // Detecta arquivos de teste
}
