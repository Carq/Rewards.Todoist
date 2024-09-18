import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Menu from "./componets/Menu";

export default function App() {
  return (
    <Box display="flex">
      <Menu />
      <Outlet />
    </Box>
  );
}
