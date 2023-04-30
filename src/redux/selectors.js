export const selectContacts = state => state.phonebook.contacts.items;
export const selectFilteredContacts = state => {
  const filterLC = state.phonebook.filter.toLocaleLowerCase();

  return state.phonebook.contacts.items.filter(({ name }) =>
    name.toLowerCase().includes(filterLC)
  );
};

export const selectFilter = state => state.phonebook.filter;

export const selectIsLoading = state => state.phonebook.contacts.isLoading;

export const selectError = state => state.phonebook.contacts.error;
