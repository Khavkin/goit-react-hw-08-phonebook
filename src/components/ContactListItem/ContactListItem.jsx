import { ListItem } from './ContactListItem.styled';
import PropTypes from 'prop-types';

import { useDeleteContactMutation } from 'api/swagger-api';
import { ClipLoader } from 'react-spinners';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const ContactListItem = ({ contact }) => {
  const { name, number, id } = contact;

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const handleOnDeleteClick = async id => {
    try {
      await deleteContact(id).unwrap();
    } catch (error) {
      toast.error('Deleting error');
    }
  };

  return (
    <ListItem>
      <Typography sx={{ width: '150px' }}>{name}</Typography>
      <Typography sx={{ width: '150px' }}>{number}</Typography>

      <IconButton
        size="small"
        aria-label="delete contact"
        aria-haspopup="true"
        color="inherit"
        onClick={() => {
          handleOnDeleteClick({ id });
        }}
      >
        {isDeleting ? (
          <ClipLoader color={'primary.contrastText'} size={14} />
        ) : (
          <DeleteOutlineOutlinedIcon />
        )}
      </IconButton>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default ContactListItem;
