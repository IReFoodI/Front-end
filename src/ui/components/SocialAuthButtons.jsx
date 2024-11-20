import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { localStorageUtil } from "@/app/utils/localStorageUtil"
import useUserStore from "@/domains/user/stores/useUserStore"
import gmail from "@/ui/assets/gmail-icon.svg"
import { Button } from "@/ui/components/ui/button/button"

export function SocialAuthButtons({ locationPathname, redirectPath }) {
  const navigate = useNavigate()
  const { setUser, setUserId } = useUserStore()

  const login = useGoogleLogin({
    onSuccess: async (credetialResponse) => {
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${credetialResponse.access_token}`,
            },
          }
        )

        const userDTO = {
          email: userInfoResponse.data.email,
          name: userInfoResponse.data.name,
          sub: userInfoResponse.data.sub,
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/google/success`,
          userDTO
        )

        localStorageUtil.setLocalStorageToken(response.data.jwt)

        localStorage.setItem("userRefoods", JSON.stringify(userDTO))

        setUser({ ...response.data, userId: response.data.id })
        setUserId(response.data.id)

        toast.success("Login efetuado com sucesso!")

        if (redirectPath) {
          navigate(`/${redirectPath}`)
        } else {
          if (locationPathname === "/autenticar/negocios") {
            navigate("/dashboard")
          } else {
            navigate("/")
          }
        }
      } catch (error) {
        console.error("Erro durante o login com Google:", error)
        toast.error("Ocorreu um erro durante o login. Tente novamente.")
      }
    },

    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <>
      <span className="text-xs text-muted-foreground">ou</span>
      <nav aria-label="Opções de login e registro" className="grid gap-2">
        <Button
          variant="outline"
          onClick={() => {
            login()
          }}
        >
          <img src={gmail} alt="icone do gmail" className="mr-2 size-4" />
          Continuar com Google
        </Button>
      </nav>
    </>
  )
}
