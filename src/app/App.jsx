import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { userService } from "@/domains/user/services/userService"
import userStore from "@/domains/user/stores/userStore"
import { Loading } from "@/ui/components/ui/loading"

// import { useFetch } from "./hooks/useFetch"

function App() {
  const { setUser, setIsUserLoading, isUserLoading } = userStore()
  // const { loading: loadingUser, onRequest: onRequestUser } = useFetch()

  // function handleSuccess(data) {
  //   setUser(data)
  //   setIsUserLoading(false)
  // }

  // function handleError() {
  //   setIsUserLoading(false)
  // }
  // useEffect(() => {
  //   async function getUser() {
  //     await onRequestUser({
  //       request: () => userService.getUser(),
  //       onSuccess: handleSuccess(),
  //       onError: handleError(),
  //       successMessage: "Login realizado com sucesso! Bem-vindo(a)!",
  //       errorMessage: "Credenciais incorretas",
  //     })
  //   }

  //   getUser()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    async function authenticate() {
      setIsUserLoading(true)
      try {
        const user = await userService.getUser()
        setUser(user)
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
