Adicionando uma Nova Rota
Para adicionar uma nova rota ao projeto, siga os passos abaixo:

1. Defina a rota no objeto ROUTES
As rotas são definidas dentro do objeto ROUTES. Este objeto centraliza os caminhos das rotas e permite que sejam facilmente reutilizadas em diferentes partes do código.

Exemplo: Adicionando uma nova rota Sobre para uma página de informações sobre a aplicação.


export const ROUTES = {
  // Rotas existentes...
  SOBRE: "/sobre",
};

2. Crie o Componente da Página
O próximo passo é criar o componente que será renderizado para a nova rota. Este componente deve seguir a estrutura do projeto, sendo armazenado na pasta adequada (por exemplo, domains/user/components).


// Exemplo: Criando o componente Sobre.jsx
import React from "react";

export const Sobre = () => {
  return (
    <div>
      <h1>Sobre a Aplicação</h1>
      <p>Informações sobre a aplicação...</p>
    </div>
  );
};
3. Importe o Componente na Configuração de Rotas
Depois de criar o componente, ele deve ser importado no arquivo de rotas (routes.js) e adicionado ao array de rotas.


import { Sobre } from "@/domains/user/components/Sobre";

// Dentro do array de rotas
{
  path: ROUTES.SOBRE,
  element: <Sobre />,
},
4. Teste a Rota
Após adicionar a nova rota, execute o projeto e navegue até o caminho configurado (/sobre) para verificar se o componente está sendo exibido corretamente.

5. (Opcional) Adicione a Rota ao Menu de Navegação
Se a nova rota precisa ser acessada por um menu ou link de navegação, adicione-a ao componente de navegação.


import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes.js";

<nav>
  <Link to={ROUTES.HOME}>Home</Link>
  <Link to={ROUTES.SOBRE}>Sobre</Link>
</nav>

Exemplo Completo

export const ROUTES = {
  HOME: "/home",
  FAVORITOS: "/favoritos",
  LOJA: "/loja",
  LOJA_INFORMATION: "/loja/information",
  MY_ORDERS: "/my-orders",
  ENDERECOS: "/enderecos",
  ENDERECOS_EDIT: "/enderecos/edit",
  ENDERECOS_EDIT_ID: "/enderecos/edit/:addressId",
  LOGIN: "/login",
  CREATE_ACCOUNT: "/create-account",
  SOBRE: "/sobre",
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.SOBRE, element: <Sobre /> },
    ],
  },
]);


