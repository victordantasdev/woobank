import React from "react"
import type { Preview } from "@storybook/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RelayEnvironmentProvider } from "react-relay"

import { ThemeProvider } from "../src/components/theme-provider"
import { environment } from "../src/relay"

import "../src/index.css"

const preview: Preview = {
  parameters: {
    docs: {
      theme: "dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark">
          <RouterProvider
            router={createBrowserRouter([
              {
                path: "*",
                element: <Story />,
              },
            ])}
          />
        </ThemeProvider>
      </RelayEnvironmentProvider>
    ),
  ],
}

export default preview
