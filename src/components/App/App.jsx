//import ContactForm from 'components/ContactForm';

//import Filter from 'components/Filter';
//import ContactList from 'components/ContactList';
//import { useDispatch, useSelector } from 'react-redux';
//import { useEffect } from 'react';
//import { fetchContacts } from 'redux/operations';
//import { selectError, selectIsLoading } from 'redux/selectors';
import SharedLayout from 'components/SharedLayout/SharedLayout';
//import { LoginForm } from 'components/Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Home from 'components/Pages/Home/Home';
//import RegisterForm from 'components/Pages/Register/Register';
//import Contacts from 'components/Pages/Contacts';
import { UseAuth } from 'hooks/useAuth';
import { useGetCurrentUserQuery } from 'api/swagger-api';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { lazy, Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

const LoginForm = lazy(() => import('components/Pages/Login'));
const RegisterForm = lazy(() => import('components/Pages/Register'));
const Contacts = lazy(() => import('components/Pages/Contacts'));

const App = () => {
  // const dispatch = useDispatch();
  // const error = useSelector(selectError);
  // const isLoading = useSelector(selectIsLoading);
  const { token, isLoggedIn, isRefreshing } = UseAuth();
  // const {
  //       error: errorRefreshing,

  // } =
  useGetCurrentUserQuery('', { skip: isLoggedIn || token === null }); //token === null

  return (
    <Box component="div" sx={{ maxWidth: 900, margin: '0 auto' }}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {!isRefreshing} && (
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <Suspense
                fallback={<ClipLoader color={'secondary.main'} size={24} />}
              >
                <PublicRoute redirectTo={'/contacts'}>
                  <LoginForm />
                </PublicRoute>
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense
                fallback={<ClipLoader color={'secondary.main'} size={24} />}
              >
                <PublicRoute redirectTo={'/contacts'}>
                  <RegisterForm />
                </PublicRoute>
              </Suspense>
            }
          />
          <Route
            path="/contacts"
            element={
              <Suspense
                fallback={<ClipLoader color={'secondary.main'} size={24} />}
              >
                <PrivateRoute>
                  <Contacts />
                </PrivateRoute>
              </Suspense>
            }
          />
          )
        </Route>
      </Routes>

      <ToastContainer autoClose={500} />
    </Box>
  );
};

export default App;
