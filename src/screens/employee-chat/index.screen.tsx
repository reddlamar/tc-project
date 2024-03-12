import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import {Button, MD2Colors} from 'react-native-paper';
import {screenNames} from '../index.screens';
import {styles} from './style.screen';

const EmployeeChatScreen = ({navigation}: any) => {
  const {inProgressOrders} = useAppSelector((state: any) => state.orderReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: 'getMessages',
      payload: {email: 'reddlamar1@gmail.com'},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={inProgressOrders}
        renderItem={({item}) => (
          <Button
            buttonColor={MD2Colors.blue700}
            textColor={MD2Colors.white}
            onPress={() =>
              navigation.navigate(screenNames.chat, {
                customerEmail: item.customerEmail,
              })
            }>
            {item.customerEmail}
          </Button>
        )}
      />
    </View>
  );
};

export default EmployeeChatScreen;
