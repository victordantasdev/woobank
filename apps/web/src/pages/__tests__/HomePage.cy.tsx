import { ThemeProvider } from "@/components/theme-provider"
import { environment } from "@/relay"
import { RelayEnvironmentProvider } from "react-relay"
import { BrowserRouter } from "react-router-dom"

import "@/index.css"
import HomePage from "../HomePage"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)

    cy.intercept("POST", "/graphql", {
      statusCode: 200,
      body: {
        data: {
          FindAccountByUserId: {
            accountNumber: "xxxxxxx-x",
            balance: 0,
            ledger: [],
          },
        },
      },
    })
  })

  it("should render login page", async () => {
    cy.mount(
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark">
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    )

    cy.findByText("Número da conta").should("be.visible")
    cy.findByText("Balanço da conta").should("be.visible")
    cy.findByText("Histórico de Transações").should("be.visible")
    cy.findByText("Criar transação").should("be.visible")
    cy.findByText("Preencha os dados com atenção").should("be.visible")

    cy.findByPlaceholderText("CPF/CNPJ do destinatário").should("be.visible")
    cy.findByPlaceholderText("Valor").should("be.visible")

    cy.findByRole("button", { name: "Realizar transferência" }).should(
      "be.visible"
    )
  })
})
