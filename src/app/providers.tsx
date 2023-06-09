"use client"

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactNode, useState } from "react"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff"
    }
  }
})

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
