// import { MdLocalLibrary } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { AppBar, Avatar, Box, Toolbar } from '@mui/material';
import { UseAuth } from 'hooks/useAuth';
import UserMenu from 'components/UserMenu/UserMenu';
import ContactsToolBar from 'components/ContactsToolBar/ContactsToolBar';
import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export const SharedLayout = props => {
  const { isLoggedIn } = UseAuth();

  return (
    <>
      <ElevationScroll {...props}>
        {/* <Box component="div" sx={{ flexGrow: 1 }}> */}
        <AppBar>
          <Toolbar sx={{ maxWidth: '1280px', margin: '0 auto' }}>
            <nav>
              <Box
                component={Link}
                to={'/'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LocalLibraryOutlinedIcon />
                </Avatar>

                <h1>Phonebook</h1>
              </Box>
            </nav>
            {isLoggedIn && <ContactsToolBar />}
            {isLoggedIn && <UserMenu />}
          </Toolbar>
        </AppBar>
        {/* </Box> */}
      </ElevationScroll>
      <Toolbar />
      <Outlet />
    </>
  );
};

//{
/* <Box sx={{ flexGrow: 1 }}>
  <FormGroup>
    <FormControlLabel
      control={
        <Switch
          checked={auth}
          onChange={handleChange}
          aria-label="login switch"
        />
      }
      label={auth ? 'Logout' : 'Login'}
    />
  </FormGroup>
  <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Photos
      </Typography>
      {auth && (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      )}
    </Toolbar>
  </AppBar>
</Box>; */
//}

export default SharedLayout;
