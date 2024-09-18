import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

import routes from "../../routes";

const Menu = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <Drawer
        sx={{ width: 250 }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {routes.map((route, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={route.link}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Menu;
