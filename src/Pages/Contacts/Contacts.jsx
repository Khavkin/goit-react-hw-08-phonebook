import { useGetContactsQuery } from 'api/swagger-api';
import ContactListItem from 'components/ContactListItem/ContactListItem';
import { useFilter } from 'components/FilterContext/FilterContext';
import { UseAuth } from 'hooks/useAuth';
import { ClipLoader } from 'react-spinners';
import { List } from './Contacts.styled';
import { toast } from 'react-toastify';

export const Contacts = () => {
  const { isLoggedIn } = UseAuth();
  const {
    data: contacts = [],
    error: errorGetContacts,
    isLoading,
  } = useGetContactsQuery('', { skip: !isLoggedIn });

  const { filter } = useFilter();

  const selectFilteredContacts = () => {
    const filterLC = filter.toLocaleLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(filterLC));
  };

  if (errorGetContacts) toast.error('Error getting contacts');

  return (
    <>
      {isLoading && (
        <ClipLoader
          color={'primary.contrastText'}
          size={50}
          cssOverride={{ display: 'block', margin: '0 auto' }}
        />
      )}
      {!isLoading && contacts?.length !== 0 && (
        <List>
          {selectFilteredContacts()?.map(contact => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </List>
      )}
    </>
  );
};

export default Contacts;
