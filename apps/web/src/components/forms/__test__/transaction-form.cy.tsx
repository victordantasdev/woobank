import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from "react-router-dom"

import "@/index.css"
import TransactionForm from "../transaction-form"
import { environment } from "@/relay"
import { RelayEnvironmentProvider } from "react-relay"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it("should render login page", async () => {
    cy.mount(
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark">
          <BrowserRouter>
            <TransactionForm
              isLoading={false}
              fetchAccountData={() => Promise.resolve()}
            />
          </BrowserRouter>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    )

    cy.findByPlaceholderText("CPF/CNPJ do destinatário").should("be.visible")
    cy.findByText("Valor").should("be.visible")

    cy.findByRole("button", { name: "Realizar transferência" })
      .should("be.visible")
      .should("be.enabled")
  })
})
