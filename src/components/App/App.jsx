import SharedLayout from 'components/SharedLayout/SharedLayout';
import { Navigate, Route, Routes } from 'react-router-dom';

import { UseAuth } from 'hooks/useAuth';
import { useGetCurrentUserQuery } from 'api/swagger-api';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { lazy, Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

const LoginForm = lazy(() => import('Pages/Login'));
const RegisterForm = lazy(() => import('Pages/Register'));
const Contacts = lazy(() => import('Pages/Contacts'));
const Home = lazy(() => import('Pages/Home'));

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
          <Route
            index
            element={
              <Suspense
                fallback={<ClipLoader color={'secondary.main'} size={24} />}
              >
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="login"
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
            path="register"
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
            path="contacts"
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ToastContainer autoClose={500} />
    </Box>
  );
};

export default App;
