import { cn } from "@/app/utils/cn"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/ui/dialog"

export function TermsOfUse({ children, className }) {
  return (
    <Dialog>
      <DialogTrigger className={cn("text-primary underline", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="py-3">Termos e Condições de Uso</DialogTitle>
          <DialogDescription />
          <div className="flex max-h-[75vh] flex-col gap-4 overflow-auto px-1 text-justify text-zinc-950 md:max-h-[80vh] md:px-3">
            <p> Última atualização: 11/10/2024</p>
            <div>
              Bem-vindo ao{" "}
              <span className="font-semibold text-primary">Refood</span>. Estes
              Termos e Condições regem o uso do nosso aplicativo, onde os
              usuários podem criar lojas para vender produtos e se cadastrar
              para comprar produtos. Ao acessar ou utilizar o Aplicativo, você
              concorda em cumprir e estar sujeito a estes Termos. Leia
              atentamente antes de utilizar nossos serviços.
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium"> 1. Definições</h3>
              <p>
                <span className="font-medium">1.1. Usuário:</span> Qualquer
                pessoa que acessa ou utiliza o Aplicativo, seja para comprar ou
                vender produtos.
              </p>
              <p>
                <span className="font-medium">1.2. Vendedor:</span> Usuário
                registrado que cria uma loja no Aplicativo para vender produtos.
              </p>
              <p>
                <span className="font-medium">1.3. Comprador:</span> Usuário
                registrado que realiza compras de produtos oferecidos por
                vendedores.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">2. Elegibilidade</h3>
              <p>
                Para usar o Aplicativo, você deve ter pelo menos 18 anos ou a
                idade de maioridade em seu local de residência. Menores de idade
                só podem usar o Aplicativo sob a supervisão de um adulto
                responsável. Ao se cadastrar, você confirma que todas as
                informações fornecidas são verdadeiras e precisas.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">3. Cadastro de Conta</h3>
              <p>
                Para utilizar nossos serviços, você deve criar uma conta
                fornecendo informações verídicas e atualizadas. Você é
                responsável por manter a segurança de suas credenciais de login.
                Nós não seremos responsáveis por qualquer uso não autorizado da
                sua conta.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium"> 4. Uso do Aplicativo</h3>
              <p>
                Ao utilizar o Aplicativo, você concorda em: Não violar nenhuma
                lei aplicável ao vender ou comprar produtos. Não realizar
                atividades fraudulentas, enganosas ou ilegais. Respeitar os
                direitos de propriedade intelectual dos outros usuários e do
                Aplicativo.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                5. Criação de Lojas e Vendas
              </h3>
              <p>
                Se você for um Vendedor, ao criar uma loja e listar produtos no
                Aplicativo, você concorda em: Fornecer descrições precisas e
                completas dos produtos. Garantir que você tem o direito de
                vender os produtos. Cumprir com todas as leis aplicáveis,
                incluindo, mas não limitado a, regras fiscais e regulatórias. O
                Vendedor é o único responsável pela entrega dos produtos
                vendidos e pela gestão do estoque.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">6. Compras</h3>
              <p>
                Ao realizar uma compra no Aplicativo, o Comprador concorda que:
                Está ciente de que a responsabilidade pelos produtos adquiridos
                recai sobre o Vendedor. Quaisquer disputas relacionadas à
                qualidade, entrega ou outros aspectos dos produtos devem ser
                resolvidas diretamente com o Vendedor.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                7. Pagamentos e Transações
              </h3>
              <p>
                O Aplicativo pode fornecer uma plataforma para facilitar os
                pagamentos entre Compradores e Vendedores. No entanto, não
                garantimos a execução de transações financeiras e não somos
                responsáveis por disputas ou problemas relacionados aos
                pagamentos. Qualquer taxa aplicável para transações será
                especificada no Aplicativo.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">8. Taxas e Comissões </h3>
              <p>
                O Aplicativo pode cobrar taxas de comissão para Vendedores com
                base nas vendas realizadas. As taxas serão claramente divulgadas
                e podem ser ajustadas periodicamente.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                9. Política de Cancelamento e Reembolso
              </h3>
              <p>
                Vendedores são responsáveis por estabelecer suas próprias
                políticas de cancelamento e reembolso, que devem ser claramente
                comunicadas aos Compradores. O Aplicativo não se responsabiliza
                por disputas de cancelamento ou reembolso entre Vendedores e
                Compradores.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                10. Propriedade Intelectual
              </h3>
              <p>
                Todo o conteúdo do Aplicativo, incluindo, mas não limitado a,
                logotipos, textos, gráficos e software, é protegido por leis de
                direitos autorais e de propriedade intelectual. Você concorda em
                não copiar, distribuir ou usar qualquer conteúdo sem permissão.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                11. Limitação de Responsabilidade{" "}
              </h3>
              <p>
                O Aplicativo atua apenas como uma plataforma intermediária entre
                Compradores e Vendedores. Não somos responsáveis por qualquer
                transação entre os usuários, incluindo, mas não limitado a,
                qualidade dos produtos, entregas, ou pagamentos. O Aplicativo
                não assume responsabilidade por danos diretos, indiretos,
                incidentais ou consequenciais relacionados ao uso do serviço.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                12. Privacidade e Proteção de Dados
              </h3>
              <p>
                Coletamos e utilizamos dados pessoais conforme nossa Política de
                Privacidade, que você deve aceitar ao usar o Aplicativo. Sua
                privacidade é importante para nós e adotamos medidas para
                proteger suas informações.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">
                13. Suspensão e Encerramento de Conta
              </h3>
              <p>
                Reservamo-nos o direito de suspender ou encerrar contas de
                usuários que violarem estes Termos ou qualquer lei aplicável.
                Podemos, a nosso critério, remover conteúdo inadequado ou
                restringir o acesso ao Aplicativo.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">14. Alterações nos Termos</h3>
              <p>
                Podemos modificar estes Termos periodicamente. Alterações serão
                comunicadas aos usuários e, ao continuar utilizando o Aplicativo
                após a notificação, você concorda em cumprir as alterações.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">15. Lei Aplicável </h3>
              <p>
                Estes Termos serão regidos pelas leis do Brasil, sem considerar
                conflitos de leis. Quaisquer disputas serão resolvidas nos
                tribunais competentes do Estado de São Paulo.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">16. Contato</h3>
              <p>
                Se você tiver qualquer dúvida sobre estes termos, entre em
                contato conosco através do e-mail{" "}
                <span className="text-primary">reefoodproject@gmail.com</span>.
              </p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
