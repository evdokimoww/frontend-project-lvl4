import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ChatButton = ({channel, currentChat, updateChannel}) => {
  const variant = channel.id === currentChat ? 'secondary' : 'light';
  const handleClick = channel.id === currentChat ? null : () => updateChannel(channel.id);

  return (
    <Button
      variant={variant}
      className={'rounded-0 w-100 text-start noFocus'}
      onClick={handleClick}
    >
      # {channel.name}
    </Button>
  )
};


export const DropdownChatButton = ({channel, currentChat, updateChannel, showModal}) => {
  const variant = channel.id === currentChat ? 'secondary' : 'light';
  const handleClick = channel.id === currentChat ? null : () => updateChannel(channel.id);
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.chatChannels' });

  return (
    <Dropdown as={ButtonGroup} className={'d-flex'}>
      <Button onClick={handleClick} variant={variant} className={'w-100 rounded-0 text-start noFocus'}># {channel.name}</Button>

      <Dropdown.Toggle split variant={variant} className={'noFocus'}>
        <span className="visually-hidden">{t('changeChannelButton')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removeChannel', {id: channel.id})}>{t('removeButton')}</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renameChannel', channel)}>{t('renameButton')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
};