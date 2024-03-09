import {Text, FlatList} from 'react-native';
import React from 'react';

import ChatBubble from 'react-native-chat-bubble';

import {styles} from './styles.component';
import {MD2Colors} from 'react-native-paper';

const Messages = ({chat}: any) => {
  return (
    <FlatList
      data={chat.sort((a: any, b: any) => {
        const millisecondsA = new Date(a.time).getMilliseconds();
        const millisecondsB = new Date(b.time).getMilliseconds();
        return millisecondsB - millisecondsA;
      })}
      renderItem={({item}) => {
        return (
          <ChatBubble
            isOwnMessage={item.sender === 'lamar@gmail.com'}
            bubbleColor={
              item.sender === 'lamar@gmail.com'
                ? MD2Colors.red900
                : MD2Colors.green400
            }
            tailColor={
              item.sender === 'lamar@gmail.com'
                ? MD2Colors.red900
                : MD2Colors.green400
            }
            withTail={true}
            style={
              item.sender === 'lamar@gmail.com'
                ? styles.senderPlacement
                : styles.recipientPlacement
            }>
            <Text style={[styles.text]}>{item.message}</Text>
          </ChatBubble>
        );
      }}
      contentContainerStyle={[styles.flatList]}
    />
  );
};

export default Messages;
