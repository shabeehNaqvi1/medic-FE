import userSlice from "../features/user/userSlice";
import uiSlice from "../features/ui/uiSlice";
import paymentSlice from "@/features/payment/paymentSlice";
import messageSlice from "@/features/message/messageSlice";
import conversationSlice from "@/features/conversations/conversationSlice";
import {
  Action,
  PayloadAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppSelector = typeof store.getState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PayloadAction<string> |
  Action<string>
>;
export let store = null as any;

export default function getStore(incomingPreloadState?: RootState) {
  store = configureStore({
    reducer: {
      //@ts-ignore
      ui: uiSlice,
      user: userSlice,
      payment: paymentSlice,
      message: messageSlice,
      conversations: conversationSlice,
    },
    preloadedState: incomingPreloadState,
  });
  return store;
}