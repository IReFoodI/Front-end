import "@testing-library/jest-dom"

import { TextDecoder, TextEncoder } from "util"

// Compatibilidade para ambientes que utilizam `global` ou `globalThis`
globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder
