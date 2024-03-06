import {View} from 'react-native';
import React from 'react';
import {Button, MD2Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles.component';
import {screenNames} from '../../screens/index.screens';

const SignUpButtons = ({handleSubmit}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="elevated"
        buttonColor={MD2Colors.redA700}
        onPress={() => navigation.navigate(screenNames.signIn)}
        textColor={MD2Colors.white}
        labelStyle={styles.buttonLabel}>
        Cancel
      </Button>
      <Button
        mode="elevated"
        buttonColor={MD2Colors.greenA700}
        onPress={() => {
          handleSubmit();
        }}
        textColor={MD2Colors.white}
        labelStyle={styles.buttonLabel}>
        Register
      </Button>
    </View>
  );
};

export default SignUpButtons;
