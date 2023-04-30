import axios from 'axios';

axios.defaults.baseURL = 'https://643124d9d4518cfb0e5b516d.mockapi.io';

export const getContacts = async () => {
  try {
    const result = await axios.get('/contacts');
    // console.log(result);
    return result;
  } catch (error) {
    //console.error(error);
    return Promise.reject(error.message);
  }
};

export const addContact = async newData => {
  try {
    const result = await axios.post('/contacts', newData);
    // console.log(result);
    return result.data;
  } catch (error) {
    // console.error(error);
    return Promise.reject(error.message);
  }
  //console.log(result);
};

export const delContact = async id => {
  try {
    const result = await axios.delete(`/contacts/${id}`);
    //console.log('delete', result);
    return result.data;
  } catch (error) {
    //console.error(error);
    return Promise.reject(error.message);
  }
  //console.log(result);
};
