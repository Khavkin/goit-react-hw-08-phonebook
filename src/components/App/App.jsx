import ContactForm from 'components/ContactForm';

import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { LoginForm } from 'components/Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Home from 'components/Pages/Home/Home';
import RegisterForm from 'components/Pages/Register/Register';
import Contacts from 'components/Pages/Contacts';
import { UseAuth } from 'hooks/useAuth';
import { useGetCurrentUserQuery, useLoginMutation } from 'api/swagger-api';
import { Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const { token, isLoggedIn, isRefreshing, user } = UseAuth();
  const {
    data,
    error: errorRefreshing,
    isLoading: isLoadingRefreshing,
    isUninitialized,
  } = useGetCurrentUserQuery('', { skip: token === null });

  console.log(
    'app',
    data,
    isLoadingRefreshing,
    token,
    isLoggedIn,
    isUninitialized
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // useEffect(() => {
  //   if (isLoggedIn)
  //     toast('Logged in', {
  //       position: 'top-right',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });
  // }, [isLoggedIn, user]);

  return (
    <Box component="div">
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {!isRefreshing} && (
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="contacts" element={<Contacts />} />)
        </Route>
      </Routes>

      {/* <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <p>Loadding....</p>}
      {error && <p>Error- {error}</p>}
      <ContactList /> */}
      <ToastContainer autoClose={500} />
    </Box>
  );
};

export default App;
