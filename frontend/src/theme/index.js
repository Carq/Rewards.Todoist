import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#86d1f6",
    },
    secondary: {
      main: "#86f6ee",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[100],
    },
    gold: {
      main: "#FFC400",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
  },
});

export default theme;
