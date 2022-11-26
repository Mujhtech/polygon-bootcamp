import { createSlice } from "@reduxjs/toolkit";
import { fetchTicketAction } from "../ticket/actions";

interface TicketState {
  datas: [] | null;
}

const initialState: TicketState = {
  datas: null,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTicketAction, (state, action) => {
      const datas = action.payload;
      if (!datas) return;
      state.datas = datas;
    });
  },
});

export const { reset } = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
