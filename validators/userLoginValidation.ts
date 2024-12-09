import * as yup from 'yup';

export const userLoginValidationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});
  