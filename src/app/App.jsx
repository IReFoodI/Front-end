import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import userStore from "@/domains/user/stores/userStore"
import { Loading } from "@/ui/components/ui/loading"

import { tokenService } from "./service/tokenService"

function App() {
  const { setUser, setIsUserLoading, isUserLoading } = userStore()
  useEffect(() => {
    async function authenticate() {
      setIsUserLoading(true)
      try {
        const user = await tokenService.getInfoUsingToken()
        setUser(user?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsUserLoading(false)
      }
    }

    authenticate()
  }, [setUser, setIsUserLoading])

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
