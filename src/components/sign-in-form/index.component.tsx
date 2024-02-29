import {View} from 'react-native';
import React from 'react';
import {TextInput, Button, MD2Colors, Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import {signInWithEmailPassword} from '../../services/api-services/firebase/auth.service';

import {styles} from './styles.component';

const SignInForm = ({email, setEmail, password, setPassword}: any) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          buttonColor={MD2Colors.blueA700}
          onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
        <Button
          buttonColor={MD2Colors.greenA700}
          onPress={() => signInWithEmailPassword(email, password)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Button>
      </View>
    </>
  );
};

export default SignInForm;
