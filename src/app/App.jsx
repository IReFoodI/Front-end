import { useEffect } from "react"
import { Outlet } from "react-router-dom"

// import { addressService } from "@/domains/user/services/addressService"
// import { userService } from "@/domains/user/services/userService"
import userStore from "@/domains/user/stores/userStore"
import { Loading } from "@/ui/components/ui/loading"

function App() {
  const { setUser, setIsUserLoading, isUserLoading } = userStore()

  useEffect(() => {
    async function authenticate() {
      setIsUserLoading(true)
      try {
        // isso aqui tá chmando requisiçao em qualquer tela, mesmo a pessoa nao estando logada
        //todo criar uma rota pra pegar informações do usuario
        // const user = await userService.getUser()
        // const user = await addressService.listAddresses()
        // setUser(user)
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
