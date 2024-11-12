import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getConversationsCurrentUserThunk,
  updateConversationThunk,
} from "./conversationThunk";
import { set } from "lodash";
import { toast } from "react-hot-toast";

interface Message {
  // Define the properties of a message
}

const initialState = {
  conversations: [] as Message[],
  loadingConversations: false,
  selectingConversation: false,
  isChatOpen: false,
  selectedConversation: null as any,
  newConversationNotification: false,
};

export const getConversationsCurrentUser = createAsyncThunk(
  "/conversations/getConversations",
  async (currentUser, thunkAPI) => {
    return getConversationsCurrentUserThunk(
      "/conversations",
      currentUser,
      thunkAPI
    );
  }
);

export const updateConversation = createAsyncThunk(
  "/conversations/updateConversation",
  async (conversationId, thunkAPI) => {
    return updateConversationThunk(
      "/conversations/update",
      conversationId,
      thunkAPI
    );
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    closeChat: (state) => {
      state.isChatOpen = false;
    },
    selectConversation: (state, action) => {
      state.selectingConversation = false;
      state.selectedConversation = action.payload;
      state.selectingConversation = true;
      if (state.selectingConversation) {
        state.isChatOpen = true;
      }
    },
    addNewConversation: (state, action) => {
      state.conversations = [...state.conversations, action.payload];
    },
    openNotification: (state) => {
      state.newConversationNotification = true;
    },
    closeNotification: (state) => {
      state.newConversationNotification = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationsCurrentUser.pending, (state) => {
        state.loadingConversations = true;
      })
      .addCase(getConversationsCurrentUser.fulfilled, (state, action) => {
        const { conversations } = action.payload;
        state.loadingConversations = false;
        state.conversations = conversations;
      })
      .addCase(getConversationsCurrentUser.rejected, (state, { payload }) => {
        state.loadingConversations = false;
        console.log(payload);
      })
      .addCase(updateConversation.pending, (state) => {
        state.loadingConversations = true;
      })
      .addCase(updateConversation.fulfilled, (state, action) => {
        state.loadingConversations = false;
      })
      .addCase(updateConversation.rejected, (state, { payload }: any) => {
        state.loadingConversations = false;
        toast.error(payload);
      });
  },
});

export const {
  closeChat,
  selectConversation,
  addNewConversation,
  openNotification,
  closeNotification,
} = messageSlice.actions;

export default messageSlice.reducer;
