
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import playerReducer from "./playerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export default store;