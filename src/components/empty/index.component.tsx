import {View} from 'react-native';
import React from 'react';
import {Button, MD2Colors, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles.component';
import {screenNames} from '../../screens/index.screens';

const Empty = ({text, showButton = true}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{text}</Text>
      {showButton && (
        <Button
          icon="store"
          onPress={() => navigation.navigate(screenNames.store)}
          buttonColor={MD2Colors.red700}
          textColor={MD2Colors.white}>
          Store
        </Button>
      )}
    </View>
  );
};

export default Empty;
