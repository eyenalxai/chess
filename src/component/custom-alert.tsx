import { Alert } from "@mui/material"

export const CustomAlert = ({ text }: { text: string }) => {
  return (
    <Alert
      sx={{
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      variant="outlined"
      icon={false}
      severity="info"
    >
      {text}
    </Alert>
  )
}
