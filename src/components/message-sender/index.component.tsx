// import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput, IconButton, MD2Colors} from 'react-native-paper';

import {styles} from './styles.component';
import {userTypes} from '../../constants/user-types';
import {useAppSelector} from '../../services/api-services/redux/hooks';

const MessageSender = ({sendMessage, customerEmail = ''}: any) => {
  const {user} = useAppSelector((state: any) => state.userReducer);
  const [message, setMessage] = useState('');

  return (
    <>
      <TextInput
        placeholder="Send a message"
        style={styles.text}
        value={message}
        onChangeText={setMessage}
        textColor={
          user?.userType === userTypes.customer
            ? MD2Colors.red700
            : MD2Colors.blue700
        }
        placeholderTextColor={
          user?.userType === userTypes.customer
            ? MD2Colors.red700
            : MD2Colors.blue700
        }
      />
      <IconButton
        style={styles.button}
        icon="send"
        containerColor={MD2Colors.grey100}
        iconColor={
          user?.userType === userTypes.customer
            ? MD2Colors.red700
            : MD2Colors.blue700
        }
        rippleColor={MD2Colors.black}
        mode="contained-tonal"
        onPress={() => {
          const newChat = {
            sender: user?.email,
            message: message,
          };
          const email = customerEmail ? customerEmail : user?.email;
          setMessage('');
          sendMessage(newChat, email);
        }}
      />
    </>
  );
};

export default MessageSender;
