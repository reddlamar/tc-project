import {View, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {styles} from './styles.screen';
import AddCartButton from '../../components/add-cart-button/index.component';

const ProductScreen = ({route}: any): any => {
  const {product} = route.params;

  const LeftContent = useCallback(
    (props: any) => (
      <Avatar.Icon {...props} icon={product.type} style={styles.icon} />
    ),
    [product],
  );

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title
          title={product.name}
          subtitle={product.company}
          left={LeftContent}
        />
        <Card.Cover style={styles.cover} source={{uri: product.images[0]}} />
        <Card.Content style={styles.content}>
          <Text variant="titleLarge" style={[styles.text, styles.price]}>
            Price: ${product.price}
          </Text>
          <Text variant="titleLarge" style={[styles.text, styles.details]}>
            {product.details}
          </Text>
          <View style={styles.extraDetail}>
            <Text variant="bodyLarge" style={[styles.text, styles.rating]}>
              Rating: {product.rating} out of 10
            </Text>
            <Text variant="bodyLarge" style={[styles.text, styles.quantity]}>
              {product.quantity} {product.name}s Available
            </Text>
          </View>
        </Card.Content>
        <Card.Actions>
          <AddCartButton product={product} />
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default ProductScreen;
