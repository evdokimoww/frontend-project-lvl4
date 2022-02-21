import React, { useEffect } from 'react';
import { useAuth } from '../hooks/index.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes.js'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { updateCurrentChannelId } from '../slices/currentChannelIdSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice.js';

const getUserAuth = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return {Authorization: `Bearer ${userId.token}`};
  }

  return {};
}

const HomePage = () => {
  const {loggedIn, logOut} = useAuth();
  const dispatch = useDispatch();

  useEffect(async () => {
    if (loggedIn) {
      const res = await axios.get(routes.getChannelAndMessages(), {
        headers: getUserAuth(),
      })
      const {channels, currentChannelId, messages} = res.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(updateCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    }
  }, [])

  const channels = useSelector((state) => channelsSelectors.selectAll(state));
  const messages = useSelector((state) => messagesSelectors.selectAll(state));

  if (!loggedIn) {
    return <Navigate to="login"/>
  }

  return <Container className={'rounded border my-4'}>
    <Row>
      <Col xs={6} md={4} className={'border-end'}>
        <a href="" onClick={() => logOut()}>выйти</a>
        <ul>
          {channels.map((channel) => <li key={channel.id}>{channel.name}</li>)}
        </ul>
      </Col>
      <Col xs={12} md={8}>
        <ul>
          {messages.map((message) => <li key={message.id}>{message.name}</li>)}
        </ul>
      </Col>
    </Row>
  </Container>
}

export default HomePage;