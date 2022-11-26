import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { config } from "./config";
import { eventReducer } from "../features/event";
import { ticketReducer } from "../features/ticket";

export function createStore() {
  return configureStore({
    reducer: {
      event: eventReducer,
      ticket: ticketReducer,
    },
    devTools: config.debug,
  });
}

export const store = createStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
