import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";
import MovieSearchBar from "../components/MovieSearchBar";
import { useSearch } from "../contexts/SearchContext";
import { Button, Menu, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarIcon from "@mui/icons-material/Star";

function MainHeader() {
  let location = useLocation();
  const { auth } = useAuth();
  const { setResults } = useSearch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  // console.log(auth);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);

    // console.log(location);
  };

  const handleLogout = () => {
    handleMenuClose(); //menu close before signout so that login won't pop up.
    auth.signout(() => {
      navigate("/");
    });
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 4 }}
    >
      {auth.user ? (
        <Stack>
          <Button color="inherit" onClick={handleMenuClose}>
            {auth.user}
          </Button>
          <Button color="inherit" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Stack>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to="/login"
          state={{ backgroundLocation: location, from: location }}
          onClick={handleMenuClose}
        >
          Login
        </Button>
      )}
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Home Cine
          </Typography>
          <MovieSearchBar onResults={setResults} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton
              component={Link}
              to="/favorite"
              size="large"
              color="inherit"
              children={<StarIcon />}
            />
            <IconButton
              component={Link}
              to="/discovery/1"
              size="large"
              color="inherit"
              children={<YouTubeIcon />}
            />
            <IconButton
              size="large"
              //cool styling ui props
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              children={<AccountCircle />}
            />
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
