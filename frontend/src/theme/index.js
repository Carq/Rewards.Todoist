import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
    white: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
      contrastText: "#242105",
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
