import React from 'react';
import {Text, MD2Colors, RadioButton, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SHA256} from 'crypto-js';
import SignUpButtons from '../sign-up-buttons/index.component';
import {addEmployee} from '../../services/api-services/firebase/firestore.service';
import {signUp} from '../../services/api-services/firebase/auth.service';
import {styles} from './styles.component';
import {screenNames} from '../../screens/index.screens';

const EmployeeSignUpForm = ({form}: any) => {
  const navigation = useNavigation<any>();

  const onSignUp = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      image,
      employeeType,
      driverLicense,
      password,
    } = form.values;

    const hash = SHA256(password).toString();

    signUp(email, password);

    addEmployee(
      firstName,
      lastName,
      phone,
      image,
      driverLicense,
      email,
      employeeType,
      hash,
    );

    clearFields();

    navigation.navigate(screenNames.signIn);
  };

  const clearFields = () => {
    form.values.fistName = '';
    form.values.lastName = '';
    form.values.email = '';
    form.values.phone = '';
    form.values.image = '';
    form.values.password = '';
  };

  return (
    <>
      <TextInput
        label="Driver License"
        value={form.values.driverLicense}
        onChangeText={form.handleChange('driverLicense')}
        onBlur={form.handleBlur('driverLicense')}
      />
      <Text style={styles.invalidText}>
        {form.errors.driverLicense && form.touched && form.errors.driverLicense}
      </Text>
      <Text variant="titleLarge">Employee Type:</Text>
      <RadioButton.Group
        onValueChange={form.handleChange('employeeType')}
        value={form.values.employeeType}>
        <RadioButton.Item
          label="Package Clerk"
          labelVariant="titleLarge"
          value="Package Clerk"
          status={
            form.values.employeeType === 'Package Clerk'
              ? 'checked'
              : 'unchecked'
          }
          color={MD2Colors.deepOrange600}
          uncheckedColor={MD2Colors.red600}
          rippleColor={MD2Colors.indigo600}
          labelStyle={{color: MD2Colors.deepOrange600}}
        />
        <RadioButton.Item
          label="Delivery Clerk"
          labelVariant="titleLarge"
          value="Delivery Clerk"
          status={
            form.values.employeeType === 'Delivery Clerk'
              ? 'checked'
              : 'unchecked'
          }
          color={MD2Colors.deepPurple700}
          rippleColor={MD2Colors.blueGrey300}
          labelStyle={{color: MD2Colors.deepPurple700}}
        />
      </RadioButton.Group>
      <Text style={styles.invalidText}>
        {form.errors.employeeType && form.touched && form.errors.employeeType}
      </Text>
      <SignUpButtons handleSubmit={onSignUp} />
    </>
  );
};

export default EmployeeSignUpForm;
