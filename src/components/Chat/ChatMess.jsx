import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const ChatMessages = ({messages, sendMessage, currentChat, username}) => {
  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleChangeText = (e) => {
    const str = e.target.value;
    setText(str);
    setBtnDisabled(!(str.length > 0));
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    sendMessage(text, currentChat, username);
    setText('');
  }

  return <Col className={'h-100 p-0'}>
    <div className={'d-flex flex-column h-100'}>
      <div className={'p-3 mb-4 shadow-sm'}>
        header
      </div>

      <div className={'overflow-auto px-5'}>
        {messages.map((message) => <div className={'mb-2'} key={message.id}><strong>{message.author}:</strong> {message.messageText}</div>)}
      </div>

      <div className={'px-5 py-3 mt-auto'}>
        <Form onSubmit={handleSendMessage}>
          <Form.Group className="d-flex">
            <Form.Control
              value={text}
              onChange={handleChangeText}
              type="text"
              placeholder="Ваше сообщение..."
            />
            <Button variant="success" type="submit" disabled={btnDisabled}>Отправить</Button>
          </Form.Group>
        </Form>
      </div>

    </div>
  </Col>
}

export default ChatMessages;