import React from 'react';
import { Button, Col, ListGroup } from 'react-bootstrap';
import { updateCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import { useDispatch } from 'react-redux';
import { ChatButton, DropdownChatButton } from './ChatButton.jsx';

export const ChatChannels = ({channels, currentChat, showModal}) => {
  const dispatch = useDispatch();

  const handleUpdateCurrentChannel = (channelId) => {
    dispatch(updateCurrentChannelId(channelId));
  }

  return <Col xs={5} md={3} className={'border-end bg-light pt-5'}>
    <div className={'d-flex justify-content-between ps-4 pe-2 mb-2'}>
      <span>Каналы</span>
      <Button
        variant={'outline-primary'}
        className={'btn-sm px-2 py-0'}
        onClick={() => showModal('addChannel')}
      >
        +
      </Button>
    </div>
    <ListGroup className="flex-column nav-pills nav-fill">
      {
        channels.map((channel) => {
          return <ListGroup.Item key={channel.id} className={'p-0 w-100 border-0'}>
            {
              channel.removable
                ? <DropdownChatButton
                  channel={channel}
                  currentChat={currentChat}
                  updateChannel={handleUpdateCurrentChannel}
                />
                : <ChatButton
                    channel={channel}
                    currentChat={currentChat}
                    updateChannel={handleUpdateCurrentChannel}
                />
            }
          </ListGroup.Item>
        })
      }
    </ListGroup>
  </Col>
};

export default ChatChannels;