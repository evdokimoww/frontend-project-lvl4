import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const ChatMessages = ({messages, sendMessage, username, currentChannelId, currentChannel}) => {
  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [channelName, setChannelName] = useState('');

  const {t} = useTranslation('translation', {keyPrefix: 'chatPage.chatMessages'});
  const lastMessageRef = useRef();

  const handleChangeText = (e) => {
    const str = e.target.value;
    setText(str);
    setBtnDisabled(!(str.length > 0));
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    sendMessage(filter.clean(text), currentChannelId, username);
    setText('');
    setBtnDisabled(true);
  }

  useEffect(() => {
    if (currentChannel) {
      setChannelName(currentChannel.name)
    }
  }, [currentChannelId])

  useEffect(async () => {
    if (messages.length > 0) {
      await lastMessageRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages])

  return <Col className={'h-100 p-0'}>
    <div className={'d-flex flex-column h-100'}>
      <div className={'p-3 mb-4 shadow-sm'}>
        <p className={'m-0'}>
          <strong># {channelName}</strong>
        </p>
        <span className={'text-muted'}>
          {t('messageCounter.count', {count: messages.length})}
        </span>
      </div>

      <div id={'message-box'} className={'overflow-auto px-5'}>
        {
          messages.map((message, index) => (
            <div
              className={'message mb-2'}
              key={message.id}
              ref={index === (messages.length - 1) ? lastMessageRef : null}
            >
              <strong>{message.author}:</strong> {message.messageText}
            </div>))
        }
      </div>

      <div className={'px-5 py-3 mt-auto'}>
        <Form onSubmit={handleSendMessage}>
          <Form.Group className="d-flex">
            <Form.Control
              value={text}
              onChange={handleChangeText}
              type="text"
              placeholder={t('messageInputPlaceholder')}
              className={'me-2'}
              aria-label={t('messageAriaLabel')}
            />
            <Button variant="success" type="submit" disabled={btnDisabled}>{t('sendMessageButton')}</Button>
          </Form.Group>
        </Form>
      </div>

    </div>
  </Col>
}

export default ChatMessages;