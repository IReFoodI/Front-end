## Refood - Front-end

## Tecnologias

- Vite
- Tailwind
- Prettier-tailwind - Plugin para organizar as classes do tailwind
- Zod - Validação
- Axios - Requisição
- React-hook-form - Formulário
- Zustand - Variavel global (tipo context)
- Icones - (react icons - phospor icons - lucide)
- Toast message - (react toastify - sonner)
- React-number-format - Mascara de input
- Framer Motion - Animação
- Swiper js - Slide
- Chart Js - Grafico
- Faker Js - Dados fakes

## Requisitos Funcionais

| Nº   | Descrição                                                                                      | Prioridade | Status  |
|------|------------------------------------------------------------------------------------------------|------------|---------|
| RF01 | Cadastrar alimentos (vinculado ao fornecedor) com as seguintes informações: Validade, Quantidade, Preço, Nome, Categoria, Foto | Alta       | Proposto |
| RF02 | Atualização e exclusão de alimentos cadastrados                                                 | Alta       | Proposto |
| RF03 | Notificações de alimentos próximos da data de validade                                          | Alta       | Proposto |
| RF04 | Sugestão de receitas baseadas nos ingredientes disponíveis                                      | Baixa      | Proposto |
| RF05 | Criação e gerenciamento de listas de compras (consumidor final e estabelecimentos)              | Alta       | Proposto |
| RF06 | Histórico de compras                                                                            | Médio      | Proposto |
| RF07 | Listagem de Produtos                                                                            | Alto       | Proposto |
| RF08 | Registro de Consumidor/Estabelecimento/Fornecedor: Nome, Senha, Email, CNPJ, Endereço, Contato  | Alto       | Proposto |
| RF09 | Integração de API de pagamento (cartão, pix) (stripe)                                           | Alto       | Proposto |
| RF10 | Pesquisa e filtro de alimentos por categoria, preço e data de validade                          | Alto       | Proposto |
| RF11 | Sistema de recomendação de produtos com base nas compras anteriores dos usuários                | Baixo      | Proposto |
| RF12 | Avaliação e comentários de usuários sobre os alimentos                                          | Médio      | Proposto |
| RF13 | Relatórios de vendas e estoques para fornecedores                                               | Alto       | Proposto |
| RF14 | Opção de doação de alimentos próximos da data de validade para instituições de caridade         | Baixo      | Proposto |
| RF15 | Suporte ao cliente via chat ou email                                                            | Baixo      | Proposto |
| RF16 | Exportação de dados financeiros para formatos CSV e PDF                                         | Baixo      | Proposto |
| RF17 | Log (criação, alteração, compra...)                                                             | -          | Proposto |

## Requisitos não funcionais

| Nº    | Descrição                                                                                                  | Prioridade | Status  |
|-------|------------------------------------------------------------------------------------------------------------|------------|---------|
| RNF01 | A aplicação deve ser intuitiva e fácil de usar                                                              | Alta       | Proposto |
| RNF02 | A aplicação deve ter um tempo de resposta rápido (menos de 2 segundos para operações principais)            | Alta       | Proposto |
| RNF03 | O sistema deve ser capaz de suportar múltiplos usuários simultâneos sem degradação de performance            | Alta       | Proposto |
| RNF04 | A aplicação deve ser segura e proteger as informações dos usuários                                          | Alta       | Proposto |
| RNF05 | O sistema deve ser compatível com os principais navegadores web (Chrome, Firefox, Safari, Edge)             | Média      | Proposto |
| RNF06 | A aplicação deve estar disponível 99,9% do tempo                                                            | Alta       | Proposto |
| RNF07 | O design deve ser responsivo, adaptando-se a diferentes resoluções de tela                                  | Alta       | Proposto |
| RNF08 | A aplicação deve ser modular para permitir futuras expansões e manutenção                                   | Média      | Proposto |
| RNF09 | O sistema deve fornecer logs de erros detalhados para depuração                                             | Média      | Proposto |
| RNF10 | A aplicação deve seguir as diretrizes de acessibilidade, tornando-se utilizável para pessoas com deficiências | Média      | Proposto |
| RNF11 | O dashboard financeiro deve ser atualizado em tempo real                                                    | Alta       | Proposto |

## Sugestões de telas

| Nº   | Descrição                                   | Prioridade | Status  |
|------|---------------------------------------------|------------|---------|
| T01  | Pg. Inicial                                 | Feito      | Proposto |
| T02  | Cadastro (Infos Básicas) > Tipo de Cadastro > Infos Específicas | Feito      |           |
| T03  | Login                                       | Feito      |           |
| T04  | Logout                                      |            |           |
| T05  | Termos de Uso e Condições                   |            |           |
| T06  | FAQ                                         | Precisa de dados |        |

## Usuário / Estabelecimento

| Nº   | Descrição                                      | Prioridade | Status  |
|------|------------------------------------------------|------------|---------|
|   | Lista de Produtos (Cardápio) / Filtros         |            |         |
|   | Lista de estabelecimentos / Filtros            |            |         |
|   | Histórico de Compras                           |            |         |
|   | Perfil > Dados                                 |            |         |
|   | Endereço (para pesquisa de locais próximos)    |            |         |
|   | Formas de Pagamento                            |            |         |
|   | Favoritos                                      |            |         |
|   | Página de Produto (Produto Específico)         |            |         |
|   | Carrinho de Compras                            |            |         |

## Fornecedor / Estabelecimento

| Nº   | Descrição                                               | Prioridade | Status  |
|------|---------------------------------------------------------|------------|---------|
|   | Relatórios de venda e estoque (RF13)                    |            |         |
|   | Registro de alimentos                                   |            |         |
|   | Dash de Produtos para manutenção (Cardápio)             |            |         |
|   | Dash de Pedidos Recebidos > Informações do Pedido       |            |         |
|   | Ajuda                                                   |            |         |
|   | Configurações da Loja                                   |            |         |
