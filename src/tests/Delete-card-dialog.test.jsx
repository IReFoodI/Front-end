import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { DeleteCardDialog } from "@/domains/user/components/credit-card/Delete-card-dialog"
import { deleteCreditCard } from "@/domains/user/services/credit-card-service"
import cardStore from "@/domains/user/stores/cardStore"

// Mockar os módulos necessários
jest.mock("@/domains/user/stores/cardStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    deleteCard: jest.fn(),
  })),
}))

jest.mock("@/domains/user/services/credit-card-service", () => ({
  deleteCreditCard: jest.fn(),
}))

describe("DeleteCardDialog", () => {
  const mockCloseDeleteCardModal = jest.fn()
  const mockDeleteCard = jest.fn()
  const cardToDelete = { current: { id: 1, name: "Teste" } }

  beforeEach(() => {
    jest.clearAllMocks()
    cardStore.mockReturnValue({ deleteCard: mockDeleteCard })
  })

  test("renders the dialog with correct text", () => {
    render(
      <DeleteCardDialog
        cardToDelete={cardToDelete}
        isDeleteModalOpen={true}
        setIsDeleteModalOpen={jest.fn()}
        closeDeleteCardModal={mockCloseDeleteCardModal}
      />
    )

    expect(
      screen.getByText("Deseja realmente excluir este cartão?")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Esta ação não pode ser desfeita. Isso excluirá permanentemente os dados do cartão."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Cancelar")).toBeInTheDocument()
    expect(screen.getByText("Confirmar")).toBeInTheDocument()
  })

  test("calls closeDeleteCardModal when Cancelar button is clicked", () => {
    render(
      <DeleteCardDialog
        cardToDelete={cardToDelete}
        isDeleteModalOpen={true}
        setIsDeleteModalOpen={jest.fn()}
        closeDeleteCardModal={mockCloseDeleteCardModal}
      />
    )

    const cancelButton = screen.getByText("Cancelar")
    fireEvent.click(cancelButton)

    expect(mockCloseDeleteCardModal).toHaveBeenCalledTimes(1)
  })

  test("handles successful card deletion", async () => {
    deleteCreditCard.mockResolvedValueOnce({})

    render(
      <DeleteCardDialog
        cardToDelete={cardToDelete}
        isDeleteModalOpen={true}
        setIsDeleteModalOpen={jest.fn()}
        closeDeleteCardModal={mockCloseDeleteCardModal}
      />
    )

    const confirmButton = screen.getByText("Confirmar")
    fireEvent.click(confirmButton)

    // Espera pela requisição assíncrona
    await waitFor(() => {
      expect(deleteCreditCard).toHaveBeenCalledWith(cardToDelete.current)
      expect(mockDeleteCard).toHaveBeenCalledWith(cardToDelete.current)
      expect(mockCloseDeleteCardModal).toHaveBeenCalledTimes(1)
    })
  })

  test("displays loading spinner while loading", async () => {
    deleteCreditCard.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({}), 1000)
        })
    )

    render(
      <DeleteCardDialog
        cardToDelete={cardToDelete}
        isDeleteModalOpen={true}
        setIsDeleteModalOpen={jest.fn()}
        closeDeleteCardModal={mockCloseDeleteCardModal}
      />
    )

    const confirmButton = screen.getByText("Confirmar")
    fireEvent.click(confirmButton)

    // Checa se o componente Loading está sendo exibido
    expect(screen.getByTestId("loading")).toBeInTheDocument()

    // Espera a requisição terminar
    await waitFor(() => {
      expect(deleteCreditCard).toHaveBeenCalledTimes(1)
    })
  })
})
