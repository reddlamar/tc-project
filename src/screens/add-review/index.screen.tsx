import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, MD2Colors, TextInput} from 'react-native-paper';
import {
  addCustomerReview,
  getDeliveryClerkByEmail,
} from '../../services/api-services/firebase/firestore.service';
import CustomModal from '../../components/modal/index.component';
import {screenNames} from '../index.screens';

const AddReviewScreen = ({navigation, route}: any) => {
  const [review, setReview] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const {deliveryClerkEmail} = route.params;

  const onPress = async () => {
    let deliveryClerk = null;

    if (deliveryClerkEmail) {
      deliveryClerk = await getDeliveryClerkByEmail(deliveryClerkEmail);
    } else {
      setError('No Deliver Clerk Email found');
      setOpen(true);
    }

    if (review && deliveryClerk) {
      await addCustomerReview(deliveryClerk, {
        review,
        reviewer: 'lamar@gmail.com',
        createAt: new Date(),
      });
      setReview('');
      navigation.navigate(screenNames.orderHistory);
    } else {
      setError('Please add a review.');
      setOpen(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Add A Review:</Text>
        <TextInput
          multiline={true}
          mode="flat"
          textColor={MD2Colors.black}
          value={review}
          onChangeText={setReview}
          style={styles.textInput}
        />
        <Button onPress={onPress}>Submit</Button>
      </View>
      <CustomModal modalVisible={open} setModalVisible={setOpen}>
        <Text style={styles.text}>{error}</Text>
      </CustomModal>
    </>
  );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 9, rowGap: 6},
  text: {fontSize: 21, fontWeight: '600'},
  textInput: {backgroundColor: MD2Colors.grey300, color: MD2Colors.white},
  label: {color: MD2Colors.white},
});
