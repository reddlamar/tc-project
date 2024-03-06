import * as Yup from 'yup';

const signUpFormUtilProps = {
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid Email!').required('Required'),
  password: Yup.string()
    .min(6, 'Need at least 6 characters')
    .required('Required'),
  phone: Yup.string()
    .min(10, 'At least 10 numbers')
    .max(10, 'At most 10 numbers')
    .required('Required'),
  image: Yup.string().required('Required'),
};

export const signUpSchema = Yup.object().shape({
  ...signUpFormUtilProps,
});

export const employeeSignUpSchema = Yup.object().shape({
  ...signUpFormUtilProps,
  employeeType: Yup.string().required('Required'),
  driverLicense: Yup.string()
    .min(8, 'At least 8 numbers')
    .max(8, 'At most 8 numbers')
    .required('Required'),
});

export const customerSignUpSchema = Yup.object().shape({
  ...signUpFormUtilProps,
  street: Yup.string().required('Required'),
  ApartmentNumber: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  postalCode: Yup.string()
    .min(5, 'At least 5 numbers')
    .max(5, 'At most 5 numbers')
    .required('Required'),
});
