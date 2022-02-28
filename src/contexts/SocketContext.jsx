import React, { createContext, useEffect } from 'react';
import { actions as messageActions } from '../slices/messagesSlice.js'
import {actions as channelActions} from '../slices/channelsSlice.js';
import { useDispatch } from 'react-redux';

export const SocketContext = createContext(null);

const SocketContextProvider = ({children, socket}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket);
    })
  }, [])

  const sendMessage = (messageText, currentChat, username) => {
    socket.emit('newMessage', { messageText, chatId: currentChat, author: username }, (response) => {
      console.log(response);
    });
  }

  const createNewChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messageActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelActions.addChannel(channel));
    })
  }, [socket])

  return <SocketContext.Provider value={{sendMessage, createNewChannel}}>
    {children}
  </SocketContext.Provider>
}

export default SocketContextProvider;