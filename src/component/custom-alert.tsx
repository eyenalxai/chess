import { Alert } from "@mui/material"

export const CustomAlert = ({ text }: { text: string }) => {
  return (
    <Alert
      sx={{
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16
      }}
      variant="outlined"
      icon={false}
      severity="info"
    >
      {text}
    </Alert>
  )
}
