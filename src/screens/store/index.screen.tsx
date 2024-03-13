import {View, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import {Avatar, Button, Card, MD2Colors, Text} from 'react-native-paper';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import {screenNames} from '../index.screens';
import {styles} from './styles.screen';
import AddCartButton from '../../components/add-cart-button/index.component';
import {companyNames} from '../../constants/company-names';

const StoreScreen = (props: any) => {
  const products = useAppSelector(
    (state: any) => state.productsReducer.products,
  );

  const {navigation} = props;

  const leftContent = useCallback((product: any) => {
    let iconName = 'devices';

    if (companyNames.indexOf(product?.company.toLowerCase()) > -1) {
      iconName = product.company.toLowerCase();
    } else {
      iconName = product.type;
    }

    return (
      <Avatar.Icon
        icon={iconName}
        size={45}
        style={{backgroundColor: MD2Colors.red700}}
        color={MD2Colors.white}
      />
    );
  }, []);

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
                  titleStyle={{color: MD2Colors.red700}}
                  subtitle={item.company}
                  subtitleStyle={{color: MD2Colors.red700}}
                  left={() => leftContent(item)}
                />
                <Card.Cover
                  style={styles.cover}
                  source={{uri: item.images[0]}}
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
                    textColor={MD2Colors.red700}
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
