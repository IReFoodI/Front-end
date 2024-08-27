import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Menu de Navegação */}
      <nav className="p-4 bg-gray-200 z-50 absolute">
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
  );
}

export default App;
