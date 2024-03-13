import {FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import Empty from '../../components/empty/index.component';
import {firebase} from '@react-native-firebase/firestore';
import {styles} from './styles.screen';

const NotificationsScreen = () => {
  const {notifications} = useAppSelector((state: any) => state.userReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateNotifications = () => {
      notifications.forEach((n: any) => {
        dispatch({
          type: 'updateNotifications',
          payload: {email: 'lamar1@gmail.com', read: true, notification: n},
        });
      });

      dispatch({
        type: 'getNotifications',
        payload: {email: 'lamar1@gmail.com'},
      });
    };

    updateNotifications();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (notifications?.length > 0) {
      return (
        <FlatList
          data={notifications}
          contentContainerStyle={styles.flatList}
          renderItem={({item}) => {
            const createdAt = new firebase.firestore.Timestamp(
              item.createdAt.seconds,
              item.createdAt.nanoseconds,
            )
              .toDate()
              .toLocaleDateString();
            return (
              <View style={styles.item}>
                <Text>{item.text}</Text>
                <Text style={styles.createdAt}>{createdAt}</Text>
              </View>
            );
          }}
        />
      );
    }
    return <Empty text="No Notifications" showButton={false} />;
  };
  return <View style={styles.container}>{renderContent()}</View>;
};

export default NotificationsScreen;
