import { createContext } from "react"

const LoginContext = createContext()

function LoginProvider({ children }) {
  return <LoginContext.Provider value={{}}>{children}</LoginContext.Provider>
}

export { LoginContext, LoginProvider }
