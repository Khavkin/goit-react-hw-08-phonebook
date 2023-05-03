import { selectFilteredContacts } from 'redux/selectors';
import { List } from './ContactList.styled';
import ContactListItem from '../ContactListItem';

import { useSelector } from 'react-redux';

const ContactsList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    contacts.length !== 0 && (
      <List>
        {contacts.map(contact => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
      </List>
    )
  );
};

export default ContactsList;
