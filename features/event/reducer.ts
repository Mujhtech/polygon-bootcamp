import { createSlice } from "@reduxjs/toolkit";
import { fetchEventAction, updateEventAction } from "../event/actions";

interface EventState {
  datas: any;
}

const initialState: EventState = {
  datas: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventAction, (state, action) => {
        const datas = action.payload;
        if (!datas) return;
        state.datas = datas;
      })
      .addCase(updateEventAction.fulfilled, (state, action) => {
        const datas = action.payload;
        if (!datas) return;
        state.datas = datas;
      });
  },
});

export const { reset } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
