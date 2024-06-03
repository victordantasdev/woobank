import { ThemeProvider } from "@/components/theme-provider"
import { environment } from "@/relay"
import { RelayEnvironmentProvider } from "react-relay"
import { BrowserRouter } from "react-router-dom"
import LoginPage from "../LoginPage"

import "@/index.css"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it("should render login page", async () => {
    cy.mount(
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark">
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    )

    cy.findByText("WOO").should("be.visible")
    cy.findByText("BANK").should("be.visible")
    cy.findByText("Acesse sua conta").should("be.visible")
    cy.findByPlaceholderText("CPF/CNPJ").should("be.visible")
    cy.findByPlaceholderText("Senha").should("be.visible")
    cy.findByRole("button", { name: "Continuar" }).should("be.visible")
    cy.findByRole("button", { name: "Criar nova conta" }).should("be.visible")
  })
})
