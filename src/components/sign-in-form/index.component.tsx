import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button, MD2Colors, Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../services/api-services/redux/hooks';

// import {signInWithEmailPassword} from '../../services/api-services/firebase/auth.service';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {styles} from './styles.component';
import {screenNames} from '../../screens/index.screens';

import {getFile} from '../../services/api-services/firebase/storage.service';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email!').required('Required'),
  password: Yup.string()
    .min(6, 'Need at least 6 characters')
    .required('Required'),
});

const SignInForm = () => {
  const navigation = useNavigation<any>();

  const formik = useFormik({
    initialValues: {
      email: 'reddlamar1@gmail.com',
      password: '123456',
    },
    validationSchema: SignInSchema,
    onSubmit: values => console.log(values),
  });

  const [url, setUrl] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getURL = async () => {
      const filePath: any = await getFile('/LR.png');
      setUrl(filePath);
    };
    getURL();
  }, []);

  const renderLogo = () => {
    if (url) {
      return (
        <View style={styles.imageContainer}>
          <Image source={{uri: url}} style={styles.image} />
        </View>
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>{renderLogo()}</View>
        <TextInput
          label="Email"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          style={styles.textInput}
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
          style={styles.textInput}
          secureTextEntry
        />
        <Text style={styles.invalidText}>
          {formik.errors.password && formik.touched && formik.errors.password}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonColor={MD2Colors.blueA700}
            onPress={() =>
              navigation.navigate(screenNames.signUp, {signUpType: 'customer'})
            }>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
          <Button
            buttonColor={MD2Colors.greenA700}
            onPress={() => {
              dispatch({
                type: 'login',
                payload: {
                  email: formik.values.email,
                  password: formik.values.password,
                },
              });
            }}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default SignInForm;
