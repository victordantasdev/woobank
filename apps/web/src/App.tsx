import { RelayEnvironmentProvider } from "react-relay"
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"

import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/theme-provider"
import LoadingScreen from "./components/loading-screen"

import { router } from "./router"
import { environment } from "./relay"

export default function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider defaultTheme="dark">
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </RelayEnvironmentProvider>
  )
}
