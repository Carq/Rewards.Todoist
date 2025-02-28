import { createTheme } from "@mui/material/styles";
import { grey, blue, yellow, green } from "@mui/material/colors";

// Custom color palette with consistent styling
const themeColors = {
  background: {
    main: grey[100],
    paper: grey[50],
    gradient: `linear-gradient(145deg, ${grey[50]}, ${grey[100]})`,
    accent: `linear-gradient(120deg, rgba(250,250,250,0.7) 0%, rgba(245,245,245,0.7) 100%)`,
  },
  user: {
    carq: {
      main: blue[500],
      light: blue[300],
      dark: blue[700],
      gradient: `linear-gradient(145deg, ${blue[400]}, ${blue[600]})`,
    },
    martyna: {
      main: green[500],
      light: green[300],
      dark: green[700],
      gradient: `linear-gradient(145deg, ${green[400]}, ${green[600]})`,
    },
  },
  rewards: {
    gold: {
      main: yellow[700],
      light: yellow[500],
      dark: yellow[900],
      gradient: `linear-gradient(145deg, ${yellow[600]}, ${yellow[800]})`,
    },
  },
};

// Create MUI theme with enhanced styling
const theme = createTheme({
  palette: {
    background: {
      default: themeColors.background.main,
      paper: themeColors.background.paper,
    },
    primary: {
      main: blue[600],
      light: blue[400],
      dark: blue[800],
    },
    secondary: {
      main: green[600],
      light: green[400],
      dark: green[800],
    },
    gold: {
      main: yellow[700],
      light: yellow[500],
      dark: yellow[900],
      contrastText: "#242105",
    },
    white: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
      contrastText: "#242105",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `
            radial-gradient(at 50% 0%, rgba(200, 220, 255, 0.1) 0%, transparent 50%), 
            radial-gradient(at 100% 0%, rgba(200, 255, 220, 0.05) 0%, transparent 50%)
          `,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation0: {
          boxShadow: "none",
        },
        elevation1: {
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          overflow: "visible",
        },
      },
    },
  },
});

// Export theme colors for use throughout the app
export { themeColors };
export default theme;
