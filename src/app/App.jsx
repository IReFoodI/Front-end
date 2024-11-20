import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import useUserStore from "@/domains/user/stores/useUserStore"
import { Loading } from "@/ui/components/ui/loading"

import { tokenService } from "./service/tokenService"

function App() {
  const { setUser, setIsUserLoading, isUserLoading } = useUserStore()
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
