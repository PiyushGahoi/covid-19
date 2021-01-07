import * as Yup from 'yup';

export const requestSchema = Yup.object().shape({
  user: Yup.string().required('User is required!'),
  hospital: Yup.string().required('hospital is required!'),
  contact: Yup.number().required('contact is required!'),
  city: Yup.string().required('city is required!'),
  type: Yup.string().required('type is required!'),
  details: Yup.string().required('details is required!'),
});