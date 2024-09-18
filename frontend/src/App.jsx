import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Menu from "./componets/Menu";

export default function App() {
  return (
    <Box display="flex">
      <Menu />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          m: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
