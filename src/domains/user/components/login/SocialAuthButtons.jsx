import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"

import facebook from "@/ui/assets/facebook-icon.svg"
import gmail from "@/ui/assets/gmail-icon.svg"
import { Button } from "@/ui/components/ui/button/button"

export function SocialAuthButtons() {
  const login = useGoogleLogin({
    onSuccess: async (credetialResponse) => {
      console.log(credetialResponse)

      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${credetialResponse.access_token}`,
            },
          }
        )
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

        {/* <GoogleLogin
          onSuccess={(credetialResponse) => {
            console.log(credetialResponse)
          }}
          onError={(error) => {
            console.log(error)
          }}
        /> */}
        <Button variant="outline">
          <img src={facebook} alt="icone do facebook" className="mr-2 size-4" />
          Continuar com Facebook
        </Button>
      </nav>
    </>
  )
}
