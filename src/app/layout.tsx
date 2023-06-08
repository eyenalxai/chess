"use client"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"

const darkTheme = createTheme({
  // Change primary color here to black

  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff"
    }
  }
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{
        fontFamily: "monospace"
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  )
}
