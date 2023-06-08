"use client"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "react-query"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff"
    }
  }
})

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{
        fontFamily: "monospace"
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <body>{children}</body>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  )
}
