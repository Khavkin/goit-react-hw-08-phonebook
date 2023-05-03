import { UseAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const Home = () => {
  //const navigate = useNavigate();
  // если пользователь не залогинен, то на страницу логина, если да, то на страницу контактов.
  const { isLoggedIn } = UseAuth();
  console.log('Home:isLoggin', isLoggedIn);
  return !isLoggedIn ? (
    <Navigate to="/login" replace />
  ) : (
    <Navigate to="/contacts" replace />
  );
};

export default Home;
