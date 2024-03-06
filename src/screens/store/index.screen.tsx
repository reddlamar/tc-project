import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Button, Card, MD2Colors, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {screenNames} from '../index.screens';

import {styles} from './styles.screen';
import {getStoreItems} from '../../services/api-services/redux/slices/products.slice';
import AddCartButton from '../../components/add-cart-button/index.component';

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="currency-usd" />
);

const StoreScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productsReducer.products);
  console.log('Product', products[0]);

  useEffect(() => {
    dispatch(getStoreItems());
  }, [dispatch]);

  if (products.length > 0) {
    return (
      <View>
        <FlatList
          data={products}
          contentContainerStyle={styles.flatList}
          renderItem={({item}) => {
            return (
              <Card style={styles.card}>
                <Card.Title
                  title={item.name}
                  subtitle={item.company}
                  left={LeftContent}
                />
                <Card.Cover
                  style={styles.cover}
                  source={{uri: 'https://picsum.photos/700'}}
                />
                <Card.Content>
                  <Text variant="bodyLarge" style={styles.price}>
                    Price: ${item.price}
                  </Text>
                </Card.Content>
                <Card.Actions style={styles.cardActions}>
                  <Button
                    onPress={() =>
                      navigation.navigate(screenNames.product, {product: item})
                    }
                    textColor={MD2Colors.blue300}
                    style={styles.moreDetailsButton}
                    icon="view-list">
                    More Details
                  </Button>
                  <AddCartButton product={item} />
                </Card.Actions>
              </Card>
            );
          }}
        />
      </View>
    );
  }
};

export default StoreScreen;
