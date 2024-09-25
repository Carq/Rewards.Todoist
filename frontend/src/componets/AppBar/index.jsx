import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

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

export default AppBarWithMenu;
