import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {Button, List, MD2Colors} from 'react-native-paper';
import {styles} from './styles.component';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../screens/index.screens';

const CategoryList = ({products, category}: any) => {
  const navigation = useNavigation<any>();

  return (
    <List.Section
      title={category}
      style={styles.listSection}
      titleStyle={styles.listSectionTitle}>
      <FlatList
        data={products}
        horizontal={true}
        contentContainerStyle={styles.flatList}
        renderItem={({item}) => {
          return (
            <Button
              onPress={() =>
                navigation.navigate(screenNames.product, {product: item})
              }
              buttonColor={MD2Colors.transparent}>
              <View style={styles.flatListView}>
                {item?.images && (
                  <Image
                    source={{uri: item?.images[0]}}
                    width={75}
                    height={75}
                    style={styles.imageList}
                  />
                )}
                <Text style={styles.textList}>{item.name}</Text>
              </View>
            </Button>
          );
        }}
      />
    </List.Section>
  );
};

export default CategoryList;
