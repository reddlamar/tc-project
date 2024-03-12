import {View} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Card, MD2Colors} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/api-services/redux/hooks';
import Messages from '../../components/messages/index.component';
import MessageSender from '../../components/message-sender/index.component';
import {styles} from './styles.screen';
import {userTypes} from '../../constants/user-types';
const LeftContent = (user: any) => (
  <Avatar.Icon
    icon="chat"
    color={MD2Colors.white}
    size={36}
    style={
      user.userType === userTypes.customer
        ? {backgroundColor: MD2Colors.red700}
        : {backgroundColor: MD2Colors.blue700}
    }
  />
);

const ChatScreen = ({route}: any) => {
  const {chat} = useAppSelector((state: any) => state.chatReducer);
  const {user} = useAppSelector((state: any) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({type: 'getMessages'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (newChat: any, email: string) => {
    if (newChat.message && newChat.sender && route?.params?.customerEmail) {
      dispatch({
        type: 'sendMessage',
        payload: {
          newChat,
          email: route?.params?.customerEmail,
          messages: chat?.messages,
        },
      });
    } else if (newChat.message && newChat.sender && email) {
      dispatch({
        type: 'sendMessage',
        payload: {newChat, email, messages: chat?.messages},
      });
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title="Chat"
          titleStyle={styles.title}
          left={() => LeftContent(user)}
        />
        <Card.Content style={styles.cardContent}>
          {chat && <Messages chat={chat} />}
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <MessageSender
            sendMessage={sendMessage}
            customerEmail={route?.params?.customerEmail}
          />
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ChatScreen;
