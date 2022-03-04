import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice.js';
import currentChannelIdSlice from './currentChannelIdSlice.js';
import messagesSlice from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    currentChannelId: currentChannelIdSlice,
    messages: messagesSlice,
  },
});
