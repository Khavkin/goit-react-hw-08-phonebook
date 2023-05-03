import { UseAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ redirectTo = '', children }) => {
  const { isLoggedIn } = UseAuth();
  const { state } = useLocation();
  const redirect = redirectTo !== '' ? redirectTo : '/';

  return !isLoggedIn ? children : <Navigate to={state ? state : redirect} />;
};

PublicRoute.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default PublicRoute;
