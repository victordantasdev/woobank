/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { mount } from "cypress/react18"

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
