import {View} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Card, MD2Colors} from 'react-native-paper';

import Messages from '../../components/messages/index.component';
import MessageSender from '../../components/message-sender/index.component';
import {styles} from './styles.screen';

const LeftContent = (props: any) => (
  <Avatar.Icon
    {...props}
    icon="chat"
    color={MD2Colors.white}
    style={{backgroundColor: MD2Colors.red600}}
  />
);

const GroupChatScreen = () => {
  const [chat, setChat] = useState([
    {
      sender: 'lamar@gmail.com',
      message: 'Hi',
      time: new Date(Date.now()).toLocaleDateString(),
    },
    {
      sender: 'mike@gmail.com',
      message: 'Hello',
      time: new Date(Date.now()).toLocaleDateString(),
    },
  ]);

  return (
    <View style={styles.container}>
      <Card style={styles.cardContent}>
        <Card.Title
          title="Employee Chat"
          titleStyle={styles.title}
          left={LeftContent}
        />
        <Card.Content style={styles.cardContent}>
          <Messages chat={chat} />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <MessageSender setChat={setChat} />
        </Card.Actions>
      </Card>
    </View>
  );
};

export default GroupChatScreen;
