import Drawer from "@mui/material/Drawer";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GradeIcon from "@mui/icons-material/Grade";
import PasswordIcon from "@mui/icons-material/Password";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
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
                    {route.name === "Dashboard" && <DashboardIcon />}
                    {route.name === "Nagrody" && <GradeIcon />}
                    {route.name === "Token" && <PasswordIcon />}
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
Menu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Menu;
