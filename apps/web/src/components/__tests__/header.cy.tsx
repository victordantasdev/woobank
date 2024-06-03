import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter } from "react-router-dom"

import "@/index.css"
import Header from "../header"

describe("LoginPage", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it("should render login page", async () => {
    cy.mount(
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    )

    cy.findByText("WOO").should("be.visible")
    cy.findByText("BANK").should("be.visible")
  })
})
