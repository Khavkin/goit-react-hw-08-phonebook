import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAddContactMutation, useGetContactsQuery } from 'api/swagger-api';
import { toast } from 'react-toastify';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Invalid Name'
    )
    .required(),
  number: Yup.string().matches(phoneRegExp, 'Invalid phone number').required(),
});

const NewContactForm = ({ onClose }) => {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { error, isLoading: isInserting }] =
    useAddContactMutation();

  const findContact = name => {
    const toFind = name.toLowerCase();
    if (
      contacts.find(({ name }) => {
        return name.toLowerCase() === toFind;
      })
    )
      return true;
    else return false;
  };

  if (error) toast.error('save new contact error');

  const handleSubmit = async contact => {
    if (!findContact(contact.name)) {
      try {
        await addContact(contact).unwrap();

        return true;
      } catch (error) {
        error.status === 400
          ? toast.error('Insert contact Error', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: false,
            })
          : toast.error('Server Error', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: false,
            });

        return false;
      }
    } else {
      return false;
    }
  };

  const formik = useFormik({
    initialValues: { name: '', number: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const submitResult = await handleSubmit(values);

      if (submitResult) {
        resetForm();
        toast.success(`Contact ${values.name} is added.`);
        onClose();
      } else
        toast.error(`${values.name} already in contacts`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
    },
  });

  return (
    <Container component="div" maxWidth="xs">
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
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Contact
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
            id="name"
            label="Contact Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number"
            label="Phone number"
            id="name"
            autoComplete="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
          <ButtonGroup
            sx={{ display: 'flex', gap: '30px', justifyContent: 'center' }}
          >
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              sx={{ mt: 3, mb: 2 }}
              disabled={
                formik.errors.name === '' ||
                formik.errors.number === '' ||
                formik.values.name === '' ||
                formik.values.number === ''
              }
            >
              {isInserting ? (
                <ClipLoader color={'primary.contrastText'} size={14} />
              ) : (
                'Save'
              )}
            </Button>
            <Button
              type="button"
              variant="contained"
              startIcon={<CancelOutlinedIcon />}
              onClick={onClose}
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default NewContactForm;
