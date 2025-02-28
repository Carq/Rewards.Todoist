import { blue, green, yellow, grey } from "@mui/material/colors";

// Style constants for consistent theming
export const profileStyles = {
  statsPanel: (color, lightColor) => ({
    p: 1.5,
    borderRadius: 2,
    background: `linear-gradient(145deg, ${lightColor}, ${color})`,
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    minWidth: 80,
  }),
  progressBar: {
    container: {
      position: "relative",
      height: 8,
      borderRadius: 4,
      backgroundColor: grey[200],
      overflow: "hidden",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
    },
    fill: {
      position: "absolute",
      height: "100%",
      background: `linear-gradient(to right, ${blue[600]}, ${blue[400]})`,
      borderRadius: 4,
      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};
