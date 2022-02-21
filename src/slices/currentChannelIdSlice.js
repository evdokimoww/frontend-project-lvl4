import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
}

const currentChannelIdAdapter = createEntityAdapter();

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    updateCurrentChannelId: (state, action) => {
      state.id = action.payload
    },
  }
})

export const selectors = currentChannelIdAdapter.getSelectors((state) => state.currentChannelId);
export const { updateCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;