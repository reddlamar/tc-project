import {View} from 'react-native';
import React from 'react';
import {Text, TextInput, Button, MD2Colors} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {signUp} from '../../services/api-services/firebase/auth.service';
import {addUser} from '../../services/api-services/firebase/firestore.service';

import {styles} from './styles.screen';

const SignUpSchema = Yup.object().shape({
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
});

const SignUpScreen = ({navigation}: any) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: values => console.log(values),
  });

  const onSignUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    signUp(email, password);
    addUser(firstName, lastName, email);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="First Name"
        onChangeText={formik.handleChange('firstName')}
        onBlur={formik.handleBlur('firstName')}
        value={formik.values.firstName}
        autoCapitalize="none"
      />
      <Text style={styles.invalidText}>
        {formik.errors.firstName && formik.touched && formik.errors.firstName}
      </Text>
      <TextInput
        label="Last Name"
        onChangeText={formik.handleChange('lastName')}
        onBlur={formik.handleBlur('lastName')}
        value={formik.values.lastName}
        autoCapitalize="none"
      />
      <Text style={styles.invalidText}>
        {formik.errors.lastName && formik.touched && formik.errors.lastName}
      </Text>
      <TextInput
        label="Email"
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        value={formik.values.email}
        autoCapitalize="none"
      />
      <Text style={styles.invalidText}>
        {formik.errors.email && formik.touched && formik.errors.email}
      </Text>
      <TextInput
        label="Password"
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        autoCapitalize="none"
        secureTextEntry
      />
      <Text style={styles.invalidText}>
        {formik.errors.password && formik.touched && formik.errors.password}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          buttonColor={MD2Colors.redA700}
          onPress={() => navigation.navigate('Sign In')}
          textColor={MD2Colors.white}>
          Cancel
        </Button>
        <Button
          mode="elevated"
          buttonColor={MD2Colors.greenA700}
          onPress={() =>
            onSignUp(
              formik.values.email,
              formik.values.password,
              formik.values.firstName,
              formik.values.lastName,
            )
          }
          textColor={MD2Colors.white}>
          Register
        </Button>
      </View>
    </View>
  );
};

export default SignUpScreen;
