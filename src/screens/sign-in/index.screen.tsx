import {View} from 'react-native';
import React, {useState} from 'react';

import SignInForm from '../../components/sign-in-form/index.component';

import {styles} from './styles.screen';

const SignInScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <SignInForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </View>
  );
};

export default SignInScreen;
