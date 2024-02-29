import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';

import {styles} from './styles';

const LoadingIndicator = ({color, text}: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={color} />
      <Text>{text}</Text>
    </View>
  );
};

export default LoadingIndicator;
