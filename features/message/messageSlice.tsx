import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendMessageThunk,
  getMessagesThunk,
  uploadImageThunk,
} from "./messageThunk";
import { toast } from "react-hot-toast";

interface Message {
  // Define the properties of a message
}

const initialState = {
  messages: [] as Message[],
  loadingMessages: false,
  loadingInitialMessages: false,
  loadingMessageFile: false,
  messageFile: "",
  messageFileName: "",
  previewUrl: "",
  isPreviewOpen: false,
  isImagePreviewOpen: false,
};

export const sendMessage = createAsyncThunk(
  "/messages/sendMessage",
  async (thunkAPI) => {
    //@ts-ignore
    return sendMessageThunk("/messages/send", thunkAPI);
  }
);

export const getMessages = createAsyncThunk(
  "/messages/getMessages",
  async (thunkAPI) => {
    //@ts-ignore
    return getMessagesThunk("/messages", thunkAPI);
  }
);

export const getMoreMessages = createAsyncThunk(
  "/messages/getMoreMessages",
  async (thunkAPI) => {
    //@ts-ignore
    return getMessagesThunk("/messages", thunkAPI);
  }
);

export const uploadFile = createAsyncThunk(
  "/messages/uploadFile",
  async (formData, thunkAPI) => {
    return uploadImageThunk("/messages/uploadFile", formData, thunkAPI);
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    openPreview: (state) => {
      state.isPreviewOpen = true;
    },
    closePreview: (state) => {
      state.isPreviewOpen = false;
    },
    emptyPreviewUrl: (state) => {
      state.previewUrl = "";
    },
    emptyFile: (state) => {
      state.messageFile = "";
      state.messageFileName = "";
    },
    openImagePreview: (state) => {
      state.isImagePreviewOpen = true;
    },
    closeImagePreview: (state) => {
      state.isImagePreviewOpen = false;
    },
    setPreviewUrl: (state, action) => {
      state.previewUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loadingMessages = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { newMessage } = action.payload;
        state.loadingMessages = false;
        state.messages = [...state.messages, newMessage];
        state.messageFile = "";
        state.messageFileName = "";
        state.previewUrl = "";
      })
      .addCase(sendMessage.rejected, (state, payload: any) => {
        state.loadingMessages = false;
        toast.error("Conversation is closed");
      })
      .addCase(getMessages.pending, (state) => {
        state.loadingInitialMessages = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.loadingInitialMessages = false;
        state.messages = [...messages];
      })
      .addCase(getMessages.rejected, (state, { payload }) => {
        state.loadingInitialMessages = false;
        console.log(payload);
      })
      .addCase(getMoreMessages.pending, (state) => {
        state.loadingMessages = true;
      })
      .addCase(getMoreMessages.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.loadingMessages = false;
        state.messages = [...state.messages, ...messages];
      })
      .addCase(getMoreMessages.rejected, (state, { payload }) => {
        state.loadingMessages = false;
        console.log(payload);
      })
      .addCase(uploadFile.pending, (state) => {
        state.loadingMessageFile = true;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        const { file } = payload;
        const { src, fileName, previewUrl } = file;
        state.loadingMessageFile = false;
        state.messageFile = src;
        state.messageFileName = fileName;
        state.previewUrl = previewUrl;
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.loadingMessageFile = false;
        console.log(payload);
      });
  },
});

export const {
  addNewMessage,
  openPreview,
  closePreview,
  emptyPreviewUrl,
  openImagePreview,
  closeImagePreview,
  setPreviewUrl,
  emptyFile,
} = messageSlice.actions;

export default messageSlice.reducer;
