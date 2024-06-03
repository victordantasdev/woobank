import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from "react-router-dom"

import "@/index.css"
import TransactionsList, { Transaction } from "../transactions-list"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  const transactions: Transaction[] = [
    {
      completedAt: "2024-01-01T00:00:00.000Z",
      status: "completed",
      senderTaxId: "111.111.111-11",
      receiverTaxId: "222.222.222-22",
      value: 10000,
    },
  ]

  it("should render login page", async () => {
    cy.mount(
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <TransactionsList
            transactions={transactions}
            loadingTransactions={false}
          />
        </BrowserRouter>
      </ThemeProvider>
    )

    cy.findByText("Data").should("be.visible")
    cy.findByText("Status").should("be.visible")
    cy.findByText("CPF/CNPJ do recebedor").should("be.visible")
    cy.findByText("Valor").should("be.visible")

    cy.findByText("domingo, 31 de dezembro de 2023 às 21:00").should(
      "be.visible"
    )
    cy.findByText("Concluído").should("be.visible")
    cy.findByText("222.222.222-22").should("be.visible")
    cy.findByText("R$ 100,00").should("be.visible")
  })
})
