import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwtRefoods")
    const userRefoods = localStorage.getItem("userRefoods")
    if (token && userRefoods) {
      setUser(JSON.parse(userRefoods))
    }
  }, [])

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
