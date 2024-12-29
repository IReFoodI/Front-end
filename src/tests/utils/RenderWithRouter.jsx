import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route)

  return render(ui, { wrapper: MemoryRouter })
}

export default renderWithRouter
