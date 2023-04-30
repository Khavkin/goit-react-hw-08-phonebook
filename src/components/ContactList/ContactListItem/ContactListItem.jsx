import { useDispatch } from 'react-redux';
import { ListItem } from './ContactListItem.styled';
import PropTypes from 'prop-types';
import { deleteContact } from 'redux/operations';
import { ButtonStyled } from 'components/Button/Button.styled';

const ContactListItem = ({ contact }) => {
  const { name, phone, id } = contact;
  const dispatch = useDispatch();
  const handleOnClick = id => {
    dispatch(deleteContact(id));
  };
  return (
    <ListItem>
      <span>{name}:</span>
      <span>{phone}</span>

      <ButtonStyled
        type="button"
        onClick={() => {
          handleOnClick(id);
        }}
      >
        Delete
      </ButtonStyled>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default ContactListItem;
