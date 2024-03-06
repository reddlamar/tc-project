import React from 'react';
import {Button, MD2Colors, Text} from 'react-native-paper';
import {Image, View} from 'react-native';

import {styles} from './styles.component';

const Profile = ({profile, imageUri}: any) => {
  const {firstName, lastName /*, email, phone, address*/} = profile;
  // const {street, city, state, postalCode} = address;

  return (
    <View style={{flex: 1}}>
      <View style={styles.topContainer}>
        <Image
          source={{uri: imageUri}}
          width={120}
          height={100}
          style={styles.image}
        />
        <Text variant="titleLarge">
          {firstName} {lastName}
        </Text>
        <Button
          buttonColor={MD2Colors.grey100}
          style={styles.button}
          textColor={MD2Colors.black}>
          Edit Profile
        </Button>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

export default Profile;
