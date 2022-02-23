import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const ChatMessages = ({ messages, sendMessage, currentChat, username }) => {
  const [text, setText] = useState('');
  const handleChangeText = (e) => {
    setText(e.target.value);
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    sendMessage(text, currentChat, username);
    setText('');
  }

  return <Col xs={12} md={8}>
    <ul>
      {messages.map((message) => <li key={message.id}><strong>{message.author}:</strong> {message.messageText}</li>)}
    </ul>
    <Form onSubmit={handleSendMessage}>
      <Form.Group className='d-flex'>
        <Form.Control
          value={text}
          onChange={handleChangeText}
          type='text'
          placeholder='Ваше сообщение...'
        />
        <Button variant='success' type='submit'>Отправить</Button>
      </Form.Group>
    </Form>
  </Col>
}

export default ChatMessages;