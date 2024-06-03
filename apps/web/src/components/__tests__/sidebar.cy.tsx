import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from "react-router-dom"

import "@/index.css"
import SideBar from "../sidebar"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it("should render login page", async () => {
    cy.mount(
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </ThemeProvider>
    )

    cy.findByText("Extrato e Transações").should("be.visible")
    cy.findByText("Fluxo de Caixa").should("be.visible")
  })
})
