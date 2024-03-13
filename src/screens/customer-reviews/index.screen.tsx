import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCustomerReviewCollection} from '../../services/api-services/firebase/firestore.service';
import CustomModal from '../../components/modal/index.component';
import Empty from '../../components/empty/index.component';
import {styles} from './styles.screen';
import {Divider, MD2Colors} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {firebase} from '@react-native-firebase/firestore';

const CustomerReviewsScreen = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('state');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      const data: any = await getCustomerReviewCollection('jay@gmail.com');

      if (data) {
        setReviews(data);
      } else {
        setError('No Reviews');
        setOpen(true);
      }
    };

    getReviews();
  }, []);

  if (reviews.length === 0) {
    return <Empty text="No Reviews" showButton={false} />;
  }

  return (
    <>
      <LinearGradient
        colors={[
          MD2Colors.blueGrey600,
          MD2Colors.blue600,
          MD2Colors.lightBlue600,
        ]}
        start={{x: 0.1, y: 0.6}}
        end={{x: 0.6, y: 0.9}}
        style={styles.container}>
        <View>
          <Text style={styles.totalReviews}>
            Total Reviews: {reviews.length}
          </Text>
          <FlatList
            data={reviews}
            renderItem={({item}: any) => {
              const createdAt = new firebase.firestore.Timestamp(
                item.createAt.seconds,
                item.createAt.nanoseconds,
              )
                .toDate()
                .toLocaleDateString();
              return (
                <View style={styles.container}>
                  <View style={styles.reviewContainer}>
                    <Text style={styles.reviewerText}>Reviewer: </Text>
                    <Text style={styles.reviewer}>{item.reviewer}</Text>
                  </View>
                  <Text style={styles.text}>{item.review}</Text>
                  <Text style={styles.createdAt}>{createdAt}</Text>
                  <Divider />
                </View>
              );
            }}
          />
        </View>
      </LinearGradient>
      <CustomModal modalVisible={open} setModalVisible={setOpen}>
        <Text style={styles.text}>{error}</Text>
      </CustomModal>
    </>
  );
};

export default CustomerReviewsScreen;
