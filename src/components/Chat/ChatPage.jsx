import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth.jsx';

import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { updateCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../../slices/messagesSlice.js';

import ChatChannels from './ChatChannels.jsx';
import ChatMessages from './ChatMess.jsx';
import useSocket from '../../hooks/useSocket.jsx';
import getModal from '../Modals/modals.js';

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const ChatPage = () => {
  const { loggedIn, getUsername, getUserAuth } = useAuth();
  const dispatch = useDispatch();
  const { sendMessage, createNewChannel } = useSocket();

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        const res = await axios.get(routes.getChannelAndMessages(), {
          headers: getUserAuth(),
        });
        const { channels, currentChannelId, messages } = res.data;

        dispatch(channelsActions.addChannels(channels));
        dispatch(updateCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
      }
    };

    fetchData();
  }, [dispatch, loggedIn]);

  const allChannels = useSelector((state) => channelsSelectors.selectAll(state));
  const allMessages = useSelector((state) => messagesSelectors.selectAll(state));

  const defaultChannels = allChannels.filter(({ removable }) => !removable);
  const channelsByCurrentUser = allChannels.filter(({ author }) => author === getUsername());
  const currentChannelId = useSelector((state) => state.currentChannelId.id);
  const currentMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  if (!loggedIn) {
    return <Navigate to="login" />;
  }

  return (
    <Container className="overflow-hidden h-100 my-4 rounded shadow">
      <Row className="h-100 bg-white">
        <ChatChannels
          channels={[...defaultChannels, ...channelsByCurrentUser]}
          currentChat={currentChannelId}
          createNewChannel={createNewChannel}
          showModal={showModal}
        />
        <ChatMessages
          messages={currentMessages}
          sendMessage={sendMessage}
          currentChannelId={currentChannelId}
          currentChannelName={currentChannel?.name}
        />
        {
        renderModal(modalInfo, hideModal)
      }
      </Row>
    </Container>
  );
};

export default ChatPage;
