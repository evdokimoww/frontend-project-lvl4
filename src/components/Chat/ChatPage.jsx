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
import getModal from '../Modals/modals.js'


const getUserAuth = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return {Authorization: `Bearer ${userId.token}`};
  }
  return {};
}

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
}

const ChatPage = () => {
  const {loggedIn} = useAuth();
  const dispatch = useDispatch();
  const { sendMessage, createNewChannel } = useSocket();

  const [username, setUsername] = useState(null);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

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

  return <Container className={'overflow-hidden h-100 my-4 rounded shadow'}>
    <Row className={'h-100 bg-white'}>
      <ChatChannels
        channels={channels}
        currentChat={currentChannelId}
        createNewChannel={createNewChannel}
        showModal={showModal}
      />
      <ChatMessages
        messages={currentMessages}
        sendMessage={sendMessage}
        currentChat={currentChannelId}
        username={username}
      />
      {
        renderModal(modalInfo, hideModal)
      }
    </Row>
  </Container>
}

export default ChatPage;