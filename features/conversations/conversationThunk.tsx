import customFetch from "../../utils/axios";

export const getConversationsCurrentUserThunk = async (
  url: string,
  currentUser: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.post(url, currentUser);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateConversationThunk = async (
  url: string,
  conversationId: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.patch(url, conversationId);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
