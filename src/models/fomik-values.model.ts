export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  image: '',
  phone: '',
};

export const employeeInitialValues = {
  ...initialValues,
  employeeType: '',
  driverLicense: '',
};

export const customerInitialValues = {
  ...initialValues,
  street: '',
  apartmentNumber: '',
  city: '',
  state: '',
};
