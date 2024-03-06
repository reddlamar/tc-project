import {ScrollView} from 'react-native';
import React from 'react';

import SignUpForm from '../../components/sign-up-form/index.component';
import EmployeeSignUpForm from '../../components/employee-sign-up-form/index.component';

import {styles} from './styles.screen';
import {useForm} from '../../hooks/useForm';
import {
  customerInitialValues,
  employeeInitialValues,
} from '../../models/fomik-values.model';
import {
  customerSignUpSchema,
  employeeSignUpSchema,
} from '../../services/api-services/Yup/schemas.service';
import CustomerSignUpForm from '../../components/customer-sign-up-form/index.component';

const SignUpScreen = ({navigation, route}: any) => {
  const {signUpType} = route.params;

  const initialValues =
    signUpType === 'employee' ? employeeInitialValues : customerInitialValues;

  const schema =
    signUpType === 'employee' ? employeeSignUpSchema : customerSignUpSchema;

  const form = useForm(initialValues, schema);

  const renderSignUpForm = () => {
    return (
      <SignUpForm
        navigation={navigation}
        form={form}
        title={signUpType === 'employee' ? 'Employee' : 'Customer'}>
        {signUpType === 'employee' ? (
          <EmployeeSignUpForm form={form} />
        ) : (
          <CustomerSignUpForm form={form} />
        )}
      </SignUpForm>
    );
  };

  return <ScrollView style={styles.container}>{renderSignUpForm()}</ScrollView>;
};

export default SignUpScreen;
