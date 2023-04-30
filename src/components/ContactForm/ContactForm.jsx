import {
  FormContact,
  FormField,
  FormInput,
  StyledErrorMessage,
} from './ContactForm.styled';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import { ButtonStyled } from 'components/Button/Button.styled';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

const ContactForm = () => {
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();
  const handleSubmit = contact => {
    const findContact = name => {
      const toFind = name.toLowerCase();
      if (contacts.find(({ name }) => name.toLowerCase() === toFind))
        return true;
      else return false;
    };
    if (!findContact(contact.name)) {
      dispatch(addContact(contact));
      return true;
    } else return false;
  };
  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .matches(
            /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            'Invalid Name'
          )
          .required(),
        phone: Yup.string()
          .matches(phoneRegExp, 'Invalid phone number')
          .required(),
      })}
      onSubmit={({ name, phone }, { resetForm }) => {
        if (handleSubmit({ name, phone })) resetForm();
        else alert(`${name} already in contacts`);
      }}
    >
      {({ errors, values }) => (
        <FormContact>
          <FormField htmlFor="name">
            Name
            <FormInput
              name="name"
              type="text"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <StyledErrorMessage name="name" component="div" />
          </FormField>
          <FormField htmlFor="phone">
            Phone
            <FormInput
              name="phone"
              type="text"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <StyledErrorMessage name="phone" component="div" />
          </FormField>

          <ButtonStyled
            type="submit"
            disabled={
              errors.name ||
              errors.phone ||
              values.name === '' ||
              values.phone === ''
            }
          >
            Add contact
          </ButtonStyled>
        </FormContact>
      )}
    </Formik>
  );
};

export default ContactForm;
