// import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import {TextInput, IconButton, MD2Colors} from 'react-native-paper';
import {UserContext} from '../../features/context';

import {styles} from './styles.component';

const MessageSender = ({setChat}: any) => {
  const {user} = useContext<any>(UserContext);
  const [message, setMessage] = useState('');

  return (
    <>
      <TextInput
        placeholder="Send a message"
        style={styles.text}
        value={message}
        onChangeText={setMessage}
        textColor={MD2Colors.red900}
        placeholderTextColor={MD2Colors.red900}
      />
      <IconButton
        style={styles.button}
        icon="send"
        containerColor={MD2Colors.grey100}
        iconColor={MD2Colors.red900}
        rippleColor={MD2Colors.green500}
        mode="contained-tonal"
        onPress={() => {
          const newChat = {
            sender: user?.email,
            message: message,
            time: new Date(Date.now().toString()).toLocaleDateString(),
          };
          setMessage('');
          setChat((chat: any) => [...chat, newChat]);
        }}
      />
    </>
  );
};

export default MessageSender;
