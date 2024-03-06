import {View} from 'react-native';
import React from 'react';

import SignInForm from '../../components/sign-in-form/index.component';

import {styles} from './styles.screen';

const SignInScreen = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <SignInForm />
    </View>
  );
};

export default SignInScreen;
