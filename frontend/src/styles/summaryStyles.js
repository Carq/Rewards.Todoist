import { blue, green, red, yellow, grey, purple } from "@mui/material/colors";

export const summaryStyles = {
  statBox: {
    p: 1.5,
    borderRadius: 2,
    background: `linear-gradient(145deg, ${grey[50]}, ${grey[100]})`,
    border: `1px solid ${grey[200]}`,
    transition: "all 0.2s ease",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
      boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
      transform: "translateY(-2px)",
    },
  },
  icon: {
    borderRadius: "50%",
    p: 0.8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    fontSize: "1.2rem",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    my: 1,
  },
  weekContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 1.5,
    borderRadius: 2,
    background: `linear-gradient(145deg, ${blue[50]}, ${blue[100]})`,
    border: `1px solid ${blue[200]}`,
    mb: 2,
  },
  trendIcon: {
    fontSize: "0.9rem",
    ml: 0.5,
    verticalAlign: "middle",
  },
};
