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

const Menu = ({ isOpened, onClick }) => {
  return (
    <Box onClick={() => onClick()}>
      <Drawer
        sx={{ width: 200 }}
        variant="temporary"
        anchor="left"
        open={isOpened}
      >
        <Box sx={{ width: 200 }}>
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
