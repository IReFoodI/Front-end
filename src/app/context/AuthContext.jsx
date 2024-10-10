import { createContext, useState } from "react"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function signIn(data) {
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
