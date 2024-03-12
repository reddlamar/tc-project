import {Text, FlatList, View} from 'react-native';
import React from 'react';

import ChatBubble from 'react-native-chat-bubble';

import {styles} from './styles.component';
import {MD2Colors} from 'react-native-paper';
import {useAppSelector} from '../../services/api-services/redux/hooks';
import {userTypes} from '../../constants/user-types';

const Messages = ({chat}: any) => {
  const {user} = useAppSelector((state: any) => state.userReducer);
  const currentUserColor =
    user.userType === userTypes.customer ? MD2Colors.red700 : MD2Colors.blue700;

  if (chat?.messages?.length > 0) {
    return (
      <FlatList
        data={chat.messages}
        renderItem={({item}) => {
          return (
            <View>
              <ChatBubble
                isOwnMessage={item.sender === user?.email}
                bubbleColor={
                  item.sender === user?.email
                    ? currentUserColor
                    : MD2Colors.green700
                }
                tailColor={
                  item.sender === user?.email
                    ? currentUserColor
                    : MD2Colors.green700
                }
                withTail={true}
                style={
                  item.sender === user?.email
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
  }
};

export default Messages;
