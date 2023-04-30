// import { MdLocalLibrary } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { AppBar, Avatar, Box, Toolbar } from '@mui/material';
import { UseAuth } from 'hooks/useAuth';
import UserMenu from 'components/UserMenu/UserMenu';

export const SharedLayout = () => {
  const { isLoggedIn } = UseAuth();
  return (
    <>
      <Box component="div" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
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
            {isLoggedIn && <UserMenu />}
          </Toolbar>
        </AppBar>
      </Box>
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
