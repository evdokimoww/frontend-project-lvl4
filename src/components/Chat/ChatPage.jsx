import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../../routes.js'
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { updateCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import ChatChannels from './ChatChannels.jsx';
import ChatMessages from './ChatMess';
import { useSocket } from '../../hooks/useSocket.jsx';


const getUserAuth = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return {Authorization: `Bearer ${userId.token}`};
  }

  return {};
}

const ChatPage = () => {
  const {loggedIn, logOut} = useAuth();
  const dispatch = useDispatch();
  const { sendMessage } = useSocket();
  const [username, setUsername] = useState(null);

  useEffect(async () => {
    if (loggedIn) {
      const res = await axios.get(routes.getChannelAndMessages(), {
        headers: getUserAuth(),
      })
      const {channels, currentChannelId, messages} = res.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(updateCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
      setUsername(JSON.parse(localStorage.getItem('userId')).username);
    }

  }, [])

  const channels = useSelector((state) => channelsSelectors.selectAll(state));
  const allMessages = useSelector((state) => messagesSelectors.selectAll(state));
  const currentChannelId = useSelector((state) => state.currentChannelId.id);

  const currentMessages = allMessages.filter(({chatId}) => chatId === currentChannelId);

  if (!loggedIn) {
    return <Navigate to="login"/>
  }


  return <Container className={'rounded border my-4'}>
    <a onClick={() => logOut()}>выйти</a>
    <Row>
      <ChatChannels channels={channels} currentChat={currentChannelId}/>
      <ChatMessages messages={currentMessages} sendMessage={sendMessage} currentChat={currentChannelId} username={username}/>
    </Row>
  </Container>
}

export default ChatPage;