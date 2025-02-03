import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const AppBarWithMenu = ({ onClick }) => {
  return (
    <AppBar position="static" color="white">
      <Toolbar>
        <IconButton onClick={() => onClick()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Todoist Rewards</Typography>
      </Toolbar>
    </AppBar>
  );
};

AppBarWithMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AppBarWithMenu;
