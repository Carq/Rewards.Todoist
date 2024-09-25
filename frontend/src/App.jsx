import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Menu from "./componets/Menu";
import AppBarWithMenu from "./componets/AppBar";

export default function App() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <>
      <Box display="flex">
        <Menu isOpened={isMenuOpened} onClick={toggleMenu} />
        <Box width="100%">
          <AppBarWithMenu onClick={toggleMenu} />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              m: "auto",
              p: 2,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}
