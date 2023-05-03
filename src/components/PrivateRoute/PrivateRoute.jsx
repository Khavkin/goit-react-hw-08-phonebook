import { UseAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ redirectTo = '', children }) => {
  const { isLoggedIn } = UseAuth();
  const location = useLocation();
  const redirect = redirectTo !== '' ? redirectTo : '/login';
  return isLoggedIn ? children : <Navigate to={redirect} state={location} />;
};

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
