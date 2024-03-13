import React from 'react';
import {View} from 'react-native';
import AddressForm from '../address-form/index.component';
import SignUpButtons from '../sign-up-buttons/index.component';
import {signUp} from '../../services/api-services/firebase/auth.service';
import {addCustomer} from '../../services/api-services/firebase/firestore.service';
import {SHA256} from 'crypto-js';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../screens/index.screens';

const CustomerSignUpForm = ({form}: any) => {
  const navigation = useNavigation<any>();

  const onSignUp = () => {
    const {firstName, lastName, email, phone, image, password} = form.values;

    const address = {
      street: form.values.street,
      city: form.values.city,
      state: form.values.state,
      postalCode: form.values.postalCode,
    };

    const hash = SHA256(password).toString();

    signUp(email, password);

    addCustomer(firstName, lastName, email, image, address, phone, hash);

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
    <View>
      <AddressForm form={form} />
      <SignUpButtons handleSubmit={onSignUp} />
    </View>
  );
};

export default CustomerSignUpForm;
