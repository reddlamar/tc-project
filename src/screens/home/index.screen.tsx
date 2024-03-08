import {View, ScrollView} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
// import {Button} from 'react-native-paper';

import {styles} from './styles.screen';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import CategoryList from '../../components/category-list/index.component';
// import {addProducts} from '../../services/api-services/firebase/firestore.service';

const HomeScreen = () => {
  const {totalPrice} = useAppSelector((state: any) => state.cartReducer);
  const {products} = useAppSelector((state: any) => state.productsReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);

  if (user) {
    return (
      <View style={styles.container}>
        {/* <Button onPress={() => addProducts()}>Add Products</Button> */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Text variant="titleMedium" style={styles.expenseText}>
              What's Up {user.firstName}
            </Text>
            <Text variant="titleLarge" style={styles.expenseText}>
              Your Total Expenses
            </Text>
            <Text style={styles.textTotal}>${totalPrice}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <CategoryList products={products} category="Popular" />
            <CategoryList products={products} category="Best Brands" />
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default HomeScreen;
