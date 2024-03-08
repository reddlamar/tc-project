import {Text, FlatList, View} from 'react-native';
import React /*, {useContext}*/ from 'react';

import ChatBubble from 'react-native-chat-bubble';

// import {UserContext} from '../../features/context';
import {styles} from './styles.component';
import {MD2Colors} from 'react-native-paper';

const Messages = ({chat}: any) => {
  // const {user} = useContext<any>(UserContext);

  return (
    <FlatList
      data={chat.sort((a: any, b: any) => {
        const millisecondsA = new Date(a.time).getMilliseconds();
        const millisecondsB = new Date(b.time).getMilliseconds();
        return millisecondsB - millisecondsA;
      })}
      renderItem={({item}) => {
        // console.log('item:', item);
        return (
          <View>
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
          </View>
        );
      }}
      contentContainerStyle={[styles.flatList]}
    />
  );
};

export default Messages;
