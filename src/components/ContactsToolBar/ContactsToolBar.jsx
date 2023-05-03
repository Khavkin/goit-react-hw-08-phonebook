import { useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import { Dialog } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

//import { useAddContactMutation } from 'api/swagger-api';
import NewContactForm from 'components/NewContactForm/NewContactForm';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './ContactsToolBar.styled';
import { useFilter } from 'components/FilterContext/FilterContext';

export const ContactsToolBar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  //const [addContact, { error, isLoading }] = useAddContactMutation();
  const { filter, setFilter } = useFilter();

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handlerOnChange = event => {
    setFilter(event.target.value);
  };

  const handleOnAddContact = () => {
    handleOpen();
  };
  return (
    <>
      <Toolbar sx={{ margin: '0 auto' }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Filter…"
            inputProps={{ 'aria-label': 'search' }}
            value={filter}
            onChange={handlerOnChange}
          />
        </Search>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOnAddContact}
        >
          <PersonAddAltOutlinedIcon />
        </IconButton>
      </Toolbar>
      <Dialog open={openDialog}>
        <NewContactForm onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default ContactsToolBar;
