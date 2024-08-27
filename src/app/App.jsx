import { Link, Outlet } from "react-router-dom"

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Menu de Navegação */}
      <nav className="absolute z-50 bg-gray-200 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favoritos">Favoritos</Link>
          </li>
        </ul>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default App
