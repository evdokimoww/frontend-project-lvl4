import React from 'react';
import { Col } from 'react-bootstrap';

export const ChatChannels = ({channels}) => {
  return <Col xs={6} md={4} className={'border-end'}>
    <ul>
      {channels.map((channel) => <li key={channel.id}>{channel.name}</li>)}
    </ul>
  </Col>
}

export default ChatChannels;