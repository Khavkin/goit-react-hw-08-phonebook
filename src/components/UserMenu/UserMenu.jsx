import { Box, Button } from '@mui/material';
import { useLogoutMutation } from 'api/swagger-api';
import { UseAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export const UserMenu = () => {
  const { user, isLoggedIn } = UseAuth();
  const [logout, { error, isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    await logout();
    navigate('/login');
  };
  if (error) toast.error('Logout Error');

  return (
    { isLoggedIn } && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        {user.email}
        <Button
          type="button"
          color="inherit"
          onClick={handleOnClick}
          sx={{ fontWeight: '700' }}
        >
          {isLoading ? (
            <ClipLoader color={'primary.contrastText'} size={14} />
          ) : (
            'Logout'
          )}
        </Button>
      </Box>
    )
  );
};

export default UserMenu;
