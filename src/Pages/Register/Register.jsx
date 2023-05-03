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
//import SignIn from 'components/SignIn/SignIn';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from 'api/swagger-api';
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
  confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Must match "password" field value'
  ),
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading: isLogging }] = useSignUpMutation();
  const { isRefreshing } = UseAuth();

  const formik = useFormik({
    initialValues: { userName: '', email: '', password: '', confirm: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { userName, email, password } = values;

      try {
        await signUp({
          name: userName,
          email: email,
          password: password,
        }).unwrap();
        resetForm();
        navigate('/contacts');
      } catch (error) {
        const { status, data } = error;
        toast.error(
          `Error status ${status}. ${data?.name}-${
            data?.code
          } in ${JSON.stringify(data?.keyValue)} `,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
          }
        );

        //console.log(error);
      }
    },
  });

  return (
    !isRefreshing && (
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              autoComplete="given-name"
              name="userName"
              required
              fullWidth
              id="userName"
              label="User Name"
              autoFocus
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Password confirm"
              type="password"
              id="confirm"
              autoComplete="current-password"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              helperText={formik.touched.confirm && formik.errors.confirm}
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
                'Sign Up'
              )}
            </Button>
            <Grid container>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
              <Grid item>
                <Link to="/login" variant="body2">
                  {'Already have an account? Sign in'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    )
  );
};

export default RegisterForm;
