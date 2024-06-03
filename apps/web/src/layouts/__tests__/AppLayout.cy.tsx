import { ThemeProvider } from "@/components/theme-provider"
import { environment } from "@/relay"
import { RelayEnvironmentProvider } from "react-relay"
import { BrowserRouter } from "react-router-dom"

import "@/index.css"
import AppLayout from "../AppLayout"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it("should render login page", async () => {
    cy.mount(
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark">
          <BrowserRouter>
            <AppLayout>
              <div>Test children</div>
            </AppLayout>
          </BrowserRouter>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    )

    cy.findByText("WOO").should("be.visible")
    cy.findByText("BANK").should("be.visible")
    cy.findByText("Test children").should("be.visible")
    cy.findByText("Extrato e Transações").should("be.visible")
    cy.findByText("Fluxo de Caixa").should("be.visible")
  })
})
