import { useLocation } from "react-router-dom"

import HeaderMobileWithoutSearch from "./HeaderMobileWhitoutSearch"
import HeaderMobileWithSearch from "./HeaderMobileWithSearch"

function HeaderMobile() {
  const location = useLocation()

  const routesWithSearch = [""] //Aqui estão todas as rotas que o header COM pesquisa deverá aparecer.

  const showSearch = routesWithSearch.includes(location.pathname)

  return (
    <>
      {showSearch ? <HeaderMobileWithSearch /> : <HeaderMobileWithoutSearch />}
    </>
  )
}

export default HeaderMobile
