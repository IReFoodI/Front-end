import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import gmail from "@/ui/assets/gmail-icon.svg"
import { Button } from "@/ui/components/ui/button/button"

export function SocialAuthButtons({ locationPathname, redirectPath }) {
  const navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: async (credetialResponse) => {
      console.log(credetialResponse)

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
          "http://localhost:8080/auth/google/success",
          userDTO
        )

        localStorage.setItem("jwtRefoods", response.data.jwt)

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

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },

    onError: (error) => {
      console.log("error")
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
