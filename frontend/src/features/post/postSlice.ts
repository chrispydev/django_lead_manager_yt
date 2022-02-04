import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  leads: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setPostState: (state, action: PayloadAction<any>) => {
      state.leads.push(action.payload);
    },

    fetchPostState: (state, action: PayloadAction<any>) => {
      state.leads = action.payload;
    },

    deleteLeadState: (state, action: PayloadAction<any>) => {
      state.leads = state.leads.filter((lead) => lead.id !== action.payload);
    },
  },
});

export const { setPostState, fetchPostState, deleteLeadState } =
  postSlice.actions;
export default postSlice.reducer;
