import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

const AppBarWithMenu = ({ clicked }) => {
  return (
    <AppBar position="static" color="background">
      <Toolbar>
        <IconButton onClick={() => clicked()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Todoist Rewards</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWithMenu;
