import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'api/swagger-api';
import { UseAuth } from 'hooks/useAuth';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const mailRegExp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validationSchema = Yup.object({
  email: Yup.string().matches(mailRegExp, 'Not a proper email').required(),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    // .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol')
    .required(),
});

export const LoginForm = () => {
  const [login, { isLoading: isLogging }] = useLoginMutation();
  const navigate = useNavigate();
  const { isRefreshing } = UseAuth();

  const formik = useFormik({
    // initialValues: { email: 'test1836@mail.com', password: 'examplepwd12345' },
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login(values).unwrap();
        resetForm();
        navigate('/contacts');
      } catch (error) {
        error.status === 400
          ? toast.error('Invalid Email or Password', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: false,
            })
          : toast.error('Server Error', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: false,
            });
        //console.log(error);
      }
    },
  });

  return (
    <>
      {!isRefreshing && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLogging ? (
                  <ClipLoader color={'primary.contrastText'} size={14} />
                ) : (
                  'Sign In'
                )}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      )}
    </>
  );
};

export default LoginForm;
