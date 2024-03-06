import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, MD2Colors, Button} from 'react-native-paper';

import {screenNames} from '../index.screens';

// import storage from '@react-native-firebase/storage';

import {
  // listFilesAndDirectories,
  getFile,
} from '../../services/api-services/firebase/storage.service';

import {styles} from './styles.screen';

const HomeScreen = ({navigation}: any) => {
  // const reference = storage().ref('/');
  // listFilesAndDirectories(reference);

  const [url, setUrl] = useState('');

  useEffect(() => {
    const getURL = async () => {
      const filePath: any = await getFile('/LR.png');
      // console.log('File Path:', filePath);
      setUrl(filePath);
    };
    getURL();
  }, []);

  const renderLogo = () => {
    if (url) {
      return (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: url}}
            style={styles.image}
            width={100}
            height={100}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentTop}>
        <Text variant="titleLarge" style={styles.expenseText}>
          Your Total Expenses
        </Text>
        <Text style={styles.textTotal}>$600.00</Text>
        <Button
          style={styles.cartDetailsButton}
          textColor={MD2Colors.white}
          rippleColor={MD2Colors.red300}
          icon="currency-usd">
          Buy Products
        </Button>
      </View>
    </View>
  );
};

//require('../../../assets/LR.png')
export default HomeScreen;
